import type ProjectRepositoryInterface from "@/repositories/ProjectRepositoryInterface";
import ExperienceRepositoryInterface from "@/repositories/ExperienceRepositoryInterface";
import type ProjectServiceInterface from "@/services/ProjectServiceInterface";
import type CacheServiceInterface from "@/services/CacheServiceInterface";
import { container } from "tsyringe";
import ProfileRepositoryInterface from "@/repositories/ProfileRepositoryInterface";

const EXPERIENCE_PERSONAL = "Personal";

export default class ProjectService implements ProjectServiceInterface {
    private repository: ProjectRepositoryInterface;
    private experienceRepository: ExperienceRepositoryInterface;
    private profileRepository: ProfileRepositoryInterface;
    private cache: CacheServiceInterface;

    constructor() {
        this.repository = container.resolve<ProjectRepositoryInterface>('ProjectRepositoryInterface');
        this.experienceRepository = container.resolve<ExperienceRepositoryInterface>('ExperienceRepositoryInterface');
        this.profileRepository = container.resolve<ProfileRepositoryInterface>('ProfileRepositoryInterface');
        this.cache = container.resolve<CacheServiceInterface>('CacheServiceInterface');
    }

    async all(): Promise<Project[]> {
        return this.cache.rememberForever('all-projects', async (): Promise<Project[]> => {
            const projects = await this.repository.all();
            for (const project of projects) {
                project.language.sort((a, b) => a.name >= b.name ? 1 : -1);
                project.frontend.sort((a, b) => a.name >= b.name ? 1 : -1);
                project.backend.sort((a, b) => a.name >= b.name ? 1 : -1);
                project.webDbServer.sort((a, b) => a.name >= b.name ? 1 : -1);
            }
            return projects.sort((a, b) => a.period.end == null
                ? 1
                : a.period.start <= b.period.start ? 1 : -1
            );
        });
    }

    async groupByCompany(): Promise<ProjectResultSet[]> {
        const allExperiences = await this.experienceRepository.all();
        const allProjects = await this.all();
        const profile = await this.profileRepository.profile();

        const result: ProjectResultSet[] = [];

        for (const company of allExperiences) {
            result.push({
                company: company.name[0].plain_text,
                icon: company.icon,
                workingPeriod: company.workingPeriod,
                projects: allProjects.filter(item => item.company === company.name[0].plain_text)
            });
        }

        result.push({
            company: EXPERIENCE_PERSONAL,
            icon: profile.icon,
            workingPeriod: 'N/A',
            projects: allProjects.filter(item => item.company === EXPERIENCE_PERSONAL)
        });

        return result;
    }

    private async getGroupBy(callback: Function): Promise<SkillResultSet[]> {
        const allProjects = await this.all();

        const groupIds: string[] = [];
        for (const project of allProjects) {
            for (const item of (callback(project) as SelectItem[])) {
                if (groupIds.indexOf(item.name) === -1) {
                    groupIds.push(item.name);
                }
            }
        }
        groupIds.sort();

        const results: SkillResultSet[] = [];
        for (const groupId of groupIds) {
            for (const project of allProjects) {
                for (const item of (callback(project) as SelectItem[])) {
                    if (groupId === item.name) {
                        const result = results.filter(a => a.name === groupId);
                        if (result.length === 0) {
                            results.push({
                                name: groupId,
                                item: item,
                                projects: [],
                                workingPeriod: ''
                            });
                        }
                        (results.filter(a => a.name === groupId)[0]).projects.push(project);
                    }
                }
            }
        }

        for (const result of results) {
            let totalMonth = 0;
            for (const project of result.projects) {
                totalMonth += project.totalMonths;
            }
            if (Math.floor(totalMonth / 12) > 0) {
                result.workingPeriod = `${Math.floor(totalMonth / 12)} yrs `
            }
            result.workingPeriod += `${totalMonth % 12} mos`
        }

        return results;
    }

    async groupByFrontend(): Promise<SkillResultSet[]> {
        return await this.getGroupBy((project: Project) => project.frontend);
    }

    async groupByBackend(): Promise<SkillResultSet[]> {
        return await this.getGroupBy((project: Project) => project.backend);
    }

    async groupByLanguage(): Promise<SkillResultSet[]> {
        return await this.getGroupBy((project: Project) => project.language);
    }

    async groupByWebDbServer(): Promise<SkillResultSet[]> {
        return await this.getGroupBy((project: Project) => project.webDbServer);
    }
}
