import ProfileServiceInterface from "./ProfileServiceInterface";
import CacheServiceInterface from "./CacheServiceInterface";
import ProfileRepositoryInterface from "@/repositories/ProfileRepositoryInterface";
import { container } from "tsyringe";

export default class ProfileService implements ProfileServiceInterface {
    private repository : ProfileRepositoryInterface;
    private cache: CacheServiceInterface;
    
    constructor() { 
        this.repository = container.resolve<ProfileRepositoryInterface>('ProfileRepositoryInterface');
        this.cache = container.resolve<CacheServiceInterface>('CacheServiceInterface');
    }

    async profile() : Promise<Profile> {
        return this.cache.rememberForever('profile', async (): Promise<Profile> => {
            return await this.repository.profile();
        });
    }
}