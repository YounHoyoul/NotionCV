import type ProjectRepositoryInterface from "@/repositories/ProjectRepositoryInterface";
import ExperienceRepositoryInterface from "@/repositories/ExperienceRepositoryInterface";
import type ProjectServiceInterface from "@/services/ProjectServiceInterface";
import type CacheServiceInterface from "@/services/CacheServiceInterface";
import { container } from "tsyringe";


export default class ProjectService implements ProjectServiceInterface {
    private repository: ProjectRepositoryInterface;
    private experienceRepository: ExperienceRepositoryInterface;
    private cache: CacheServiceInterface;

    constructor() {
        this.repository = container.resolve<ProjectRepositoryInterface>('ProjectRepositoryInterface');
        this.experienceRepository = container.resolve<ExperienceRepositoryInterface>('ExperienceRepositoryInterface');
        this.cache = container.resolve<CacheServiceInterface>('CacheServiceInterface');
    }

    async all(): Promise<Project[]> {
        return this.cache.rememberForever('all-projects', async (): Promise<Project[]> => {
            return (await this.repository.all()).sort((a, b) => a.period.start <= b.period.start ? 1 : -1);
        });
    }

    async groupByCompany(): Promise<{ company: string, workingPeriod: string, projects: Project[] }[]> {
        const allExperiences = await this.experienceRepository.all();
        const allProjects = await this.all();

        const result: { company: string, workingPeriod: string, projects: Project[] }[] = [];
        const allCompanies: string[] = allExperiences.map(experience => experience.name[0].plain_text);
        allCompanies.push('Personal');

        for (const company of allCompanies) {
            result.push({
                company: company,
                workingPeriod: allExperiences.filter(item => item.name[0].plain_text == company)[0]?.workingPeriod ?? '',
                projects: allProjects.filter(item => item.company === company)
            });
        }

        return result;
    }

    private async getGroupBy(callback: Function): Promise<SkillResultSet[]> {
        const allProjects = await this.all();

        const groupIds: string[] = [];
        for (const project of allProjects) {
            for (const item of callback(project)) {
                if (groupIds.indexOf(item.name) === -1) {
                    groupIds.push(item.name);
                }
            }
        }
        groupIds.sort();

        const results: SkillResultSet[] = [];
        for (const groupId of groupIds) {
            for (const project of allProjects) {
                for (const item of callback(project)) {
                    if (groupId === item.name) {
                        const result = results.filter(a => a.name === groupId);
                        if (result.length === 0) {
                            results.push({
                                name: groupId,
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
