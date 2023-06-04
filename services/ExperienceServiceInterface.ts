
export default interface ExperienceServiceInterface {
    all() : Promise<Experience[]>;
    allWithProjects() : Promise<ExperienceResultSet[]>;
}