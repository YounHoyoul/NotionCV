
export default interface CertServiceInterface {
    all() : Promise<Cert[]>;
    allCerts() : Promise<Cert[]>;
}