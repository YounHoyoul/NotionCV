import type ProjectRepositoryInterface from "@/repositories/ProjectRepositoryInterface";
import type ProjectServiceInterface from "@/services/ProjectServiceInterface";
import type CacheServiceInterface from "@/services/CacheServiceInterface";
import { container } from "tsyringe";

export default class ProjectService implements ProjectServiceInterface {
    private repository : ProjectRepositoryInterface;
    private cache: CacheServiceInterface;
    
    constructor() { 
        this.repository = container.resolve<ProjectRepositoryInterface>('ProjectRepositoryInterface');
        this.cache = container.resolve<CacheServiceInterface>('CacheServiceInterface');
    }

    async all(): Promise<Project[]> {
        return this.cache.rememberForever('all-projects', async (): Promise<Project[]> => {
            return await this.repository.all();
        });
    }
}
