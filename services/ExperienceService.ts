import type ExperienceRepositoryInterface from "@/repositories/ExperienceRepositoryInterface";
import type ExperienceServiceInterface from "@/services/ExperienceServiceInterface";
import type CacheServiceInterface from "@/services/CacheServiceInterface";
import { container } from "tsyringe";

export default class ExperienceService implements ExperienceServiceInterface {
    private repository : ExperienceRepositoryInterface;
    private cache: CacheServiceInterface;
    
    constructor() { 
        this.repository = container.resolve<ExperienceRepositoryInterface>('ExperienceRepositoryInterface');
        this.cache = container.resolve<CacheServiceInterface>('CacheServiceInterface');
    }

    async all(): Promise<Experience[]> {
        return this.cache.rememberForever('all-experiences', async (): Promise<Experience[]> => {
            return await this.repository.all();
        });
    }
}
