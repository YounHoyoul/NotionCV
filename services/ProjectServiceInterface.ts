export default interface ProjectServiceInterface {
    all(): Promise<Project[]>;
    groupByCompany(): Promise<{company: Experience, projects: Project[]}[]>;
    groupByFrontend(): Promise<SkillResultSet[]>;
    groupByBackend(): Promise<SkillResultSet[]>;
    groupByLanguage(): Promise<SkillResultSet[]>;
    groupByWebDbServer(): Promise<SkillResultSet[]>;
}