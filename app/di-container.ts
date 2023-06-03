import { container } from "tsyringe";
import { Client as NotionClient } from '@notionhq/client';
import ProjectRepository from "@/repositories/ProjectRepository";
import CacheService from "@/services/CacheService";
import ProjectService from "@/services/ProjectService";
import StorageService from "@/services/StorageService";
import ProjectRepositoryInterface from "@/repositories/ProjectRepositoryInterface";
import CacheServiceInterface from "@/services/CacheServiceInterface";
import StorageServiceInterface from "@/services/StorageServiceInterface";
import ProjectServiceInterface from "@/services/ProjectServiceInterface";
import ExperienceRepositoryInterface from "@/repositories/ExperienceRepositoryInterface";
import ExperienceRepository from "@/repositories/ExperienceRepository";
import ExperienceServiceInterface from "@/services/ExperienceServiceInterface";
import ExperienceService from "@/services/ExperienceService";
import CertRepository from "@/repositories/CertRepository";
import CertRepositoryInterface from "@/repositories/CertRepositoryInterface";
import CertServiceInterface from "@/services/CertServiceInterface";
import CertService from "@/services/CertService";
import ProfileRepositoryInterface from "@/repositories/ProfileRepositoryInterface";
import ProfileRepository from "@/repositories/ProfileRepository";
import ProfileServiceInterface from "@/services/ProfileServiceInterface";
import ProfileService from "@/services/ProfileService";

container.register<ProjectRepositoryInterface>('ProjectRepositoryInterface', ProjectRepository);
container.register<ExperienceRepositoryInterface>('ExperienceRepositoryInterface', ExperienceRepository);
container.register<CertRepositoryInterface>('CertRepositoryInterface', CertRepository);
container.register<ProfileRepositoryInterface>('ProfileRepositoryInterface', ProfileRepository);

container.register<CacheServiceInterface>('CacheServiceInterface', CacheService);
container.register<StorageServiceInterface>('StorageServiceInterface', StorageService);
container.register<ProjectServiceInterface>('ProjectServiceInterface', ProjectService);
container.register<ExperienceServiceInterface>('ExperienceServiceInterface', ExperienceService);
container.register<CertServiceInterface>('CertServiceInterface', CertService);
container.register<ProfileServiceInterface>('ProfileServiceInterface', ProfileService);

container.registerInstance<NotionClient>('NotionClient', new NotionClient({ auth: process.env.NOTION_API_KEY }));
