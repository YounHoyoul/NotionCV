export default interface ProjectServiceInterface {
    all() : Promise<Project[]>;
}