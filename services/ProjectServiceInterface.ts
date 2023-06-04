export default interface ProjectServiceInterface {
    all(): Promise<Project[]>;
    groupByCompany(): Promise<ProjectResultSet[]>;
    groupByFrontend(): Promise<SkillResultSet[]>;
    groupByBackend(): Promise<SkillResultSet[]>;
    groupByLanguage(): Promise<SkillResultSet[]>;
    groupByWebDbServer(): Promise<SkillResultSet[]>;
}