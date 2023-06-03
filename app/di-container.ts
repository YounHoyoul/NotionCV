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

container.register<ProjectRepositoryInterface>('ProjectRepositoryInterface', ProjectRepository);
container.register<CacheServiceInterface>('CacheServiceInterface', CacheService);
container.register<StorageServiceInterface>('StorageServiceInterface', StorageService);
container.register<ProjectServiceInterface>('ProjectServiceInterface', ProjectService);

container.registerInstance<NotionClient>('NotionClient', new NotionClient({ auth: process.env.NOTION_API_KEY }));
