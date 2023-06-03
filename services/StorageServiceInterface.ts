
export default interface StorageServiceInterface {
    get(path: string) : Promise<string>;
    put(data: string, path: string): Promise<void>;
}
