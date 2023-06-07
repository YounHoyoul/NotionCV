import type CertRepositoryInterface from "@/repositories/CertRepositoryInterface";
import type CertServiceInterface from "@/services/CertServiceInterface";
import type CacheServiceInterface from "@/services/CacheServiceInterface";
import { container } from "tsyringe";

export default class CertService implements CertServiceInterface {
    private repository: CertRepositoryInterface;
    private cache: CacheServiceInterface;

    constructor() {
        this.repository = container.resolve<CertRepositoryInterface>('CertRepositoryInterface');
        this.cache = container.resolve<CacheServiceInterface>('CacheServiceInterface');
    }

    async all(): Promise<Cert[]> {
        return this.cache.rememberForever('all-certs', async (): Promise<Cert[]> => {
            return await this.repository.all();
        });
    }

    async allCerts(): Promise<Cert[]> {
        const allCerts = await this.all();

        return allCerts
            .filter(cert => cert.type.name === 'Certificate')
            .sort((a, b) => a.issueDate.start <= b.issueDate.start ? 1 : -1);
    }

    async allPatents() : Promise<Cert[]> {
        const allCerts = await this.all();

        return allCerts
            .filter(cert => cert.type.name === 'Patent')
            .sort((a, b) => a.issueDate.start <= b.issueDate.start ? 1 : -1);
    }

    async allPapers() : Promise<Cert[]> {
        const allCerts = await this.all();

        return allCerts
            .filter(cert => cert.type.name === 'Paper')
            .sort((a, b) => a.issueDate.start <= b.issueDate.start ? 1 : -1);
    }
}
