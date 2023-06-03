
export default interface CertRepositoryInterface {
    all() : Promise<Cert[]>;
}