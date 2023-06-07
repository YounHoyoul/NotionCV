
export default interface CertServiceInterface {
    all() : Promise<Cert[]>;
    allCerts() : Promise<Cert[]>;
    allPatents() : Promise<Cert[]>;
    allPapers() : Promise<Cert[]>;
}