import type ProjectRepositoryInterface from "@/repositories/ProjectRepositoryInterface";
import ExperienceRepositoryInterface from "@/repositories/ExperienceRepositoryInterface";
import type ProjectServiceInterface from "@/services/ProjectServiceInterface";
import type CacheServiceInterface from "@/services/CacheServiceInterface";
import { container } from "tsyringe";
import ProfileRepositoryInterface from "@/repositories/ProfileRepositoryInterface";

const EXPERIENCE_PERSONAL = "Personal";

export const fnSortAtoZ = (a: SelectItem, b: SelectItem): number => a.name >= b.name ? 1 : -1;

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
                project.language.sort(fnSortAtoZ);
                project.frontend.sort(fnSortAtoZ);
                project.backend.sort(fnSortAtoZ);
                project.webDbServer.sort(fnSortAtoZ);
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
        allProjects.forEach(project => (callback(project) as SelectItem[]).forEach(item => {
            (groupIds.indexOf(item.name) === -1) && (groupIds.push(item.name))
        }));

        const results: SkillResultSet[] = [];
        groupIds.forEach(groupId => allProjects.forEach(project => (callback(project) as SelectItem[]).forEach(item => {
            if (groupId === item.name) {
                const result = results.filter(a => a.name === groupId);
                if (result.length === 0) {
                    results.push({
                        name: groupId,
                        item: item,
                        projects: [],
                        workingPeriod: '',
                        totalMonths: 0,
                        highlighted: false
                    });
                }
                (results.filter(a => a.name === groupId)[0]).projects.push(project);
            }
        })));

        for (const result of results) {
            result.totalMonths = result.projects.reduce((a, b) => a + b.totalMonths, 0);
            const years = Math.floor(result.totalMonths / 12);
            const months = result.totalMonths % 12;
            result.workingPeriod += (years > 0 ? `${years} yrs ` : '') + `${months} mos`;
            result.highlighted =
                result.projects.length >= parseInt(process.env.HIGHLIGHT_COUNT ?? '3') &&
                result.totalMonths >= parseInt(process.env.HIGHLIGHT_MONTHS ?? '60')
        }

        results.sort((a, b) => a.totalMonths <= b.totalMonths ? 1 : -1);

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
