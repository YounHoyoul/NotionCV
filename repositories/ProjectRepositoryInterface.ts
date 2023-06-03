
export default interface ProjectRepositoryInterface {
    all(): Promise<Project[]>;
}