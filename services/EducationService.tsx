import type EducationRepositoryInterface from "@/repositories/EducationRepositoryInterface";
import type EducationServiceInterface from "@/services/EducationServiceInterface";
import type CacheServiceInterface from "@/services/CacheServiceInterface";
import { container } from "tsyringe";

export default class EducationService implements EducationServiceInterface {
    private repository: EducationRepositoryInterface;
    private cache: CacheServiceInterface;

    constructor() {
        this.repository = container.resolve<EducationRepositoryInterface>('EducationRepositoryInterface');
        this.cache = container.resolve<CacheServiceInterface>('CacheServiceInterface');
    }

    async all(): Promise<Education[]> {
        return this.cache.rememberForever('all-educations', async (): Promise<Education[]> => {
            return await this.repository.all();
        });
    }
}