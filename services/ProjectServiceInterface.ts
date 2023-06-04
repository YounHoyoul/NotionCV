export default interface ProjectServiceInterface {
    all(): Promise<Project[]>;
    groupByCompany(): Promise<{company: string, workingPeriod: string, projects: Project[]}[]>;
    groupByFrontend(): Promise<SkillResultSet[]>;
    groupByBackend(): Promise<SkillResultSet[]>;
    groupByLanguage(): Promise<SkillResultSet[]>;
    groupByWebDbServer(): Promise<SkillResultSet[]>;
}