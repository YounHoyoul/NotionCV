import type ExperienceRepositoryInterface from "@/repositories/ExperienceRepositoryInterface";
import type ExperienceServiceInterface from "@/services/ExperienceServiceInterface";
import type CacheServiceInterface from "@/services/CacheServiceInterface";
import { container } from "tsyringe";
import ProjectServiceInterface from "./ProjectServiceInterface";

export default class ExperienceService implements ExperienceServiceInterface {
    private repository: ExperienceRepositoryInterface;
    private projectService: ProjectServiceInterface;
    private cache: CacheServiceInterface;

    constructor() {
        this.repository = container.resolve<ExperienceRepositoryInterface>('ExperienceRepositoryInterface');
        this.projectService = container.resolve<ProjectServiceInterface>('ProjectServiceInterface');
        this.cache = container.resolve<CacheServiceInterface>('CacheServiceInterface');
    }

    async all(): Promise<Experience[]> {
        return this.cache.rememberForever('all-experiences', async (): Promise<Experience[]> => {
            return await this.repository.all();
        });
    }

    private distintItems(projects: Project[], callback: Function) {
        const distincts: SelectItem[] = [];

        for (const project of projects) {
            for (const item of callback(project)) {
                if (distincts.filter(a => a.name === item.name).length === 0) {
                    distincts.push(item);
                }
            }
        }

        return distincts;
    }

    async allWithProjects(): Promise<ExperienceResultSet[]> {
        const allCompanies = await this.all();
        const groupedProjects = await this.projectService.groupByCompany();

        const result: ExperienceResultSet[] = [];

        for (const experiences of allCompanies) {
            const companyName = experiences.name[0].plain_text;
            const projects = groupedProjects.filter(a => a.company === companyName)[0].projects;
            result.push({
                company: experiences,
                projects: projects,
                language: this.distintItems(projects, (project: Project) => project.language),
                frontend: this.distintItems(projects, (project: Project) => project.frontend),
                backend: this.distintItems(projects, (project: Project) => project.backend),
                webDbServer: this.distintItems(projects, (project: Project) => project.webDbServer),
            });
        }

        return result;
    }
}
