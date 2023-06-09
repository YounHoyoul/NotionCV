import CertRepositoryInterface from "./CertRepositoryInterface";
import NotionRepository from "./NotionRepository";
import {
    PROPERITES,
    FIELD_NAME,
    FIELD_TYPE,
    FIELD_ISSUING_ORGANIZATION,
    FIELD_ISSUE_DATE,
    FIELD_ID,
    SLEEP
} from './Constants';
import sleep from "sleep-promise";

export default class CertRepository extends NotionRepository implements CertRepositoryInterface {
    private async convert(results: any[]): Promise<Cert[]> {
        const certs: Cert[] = [];

        for (const cert of results) {
            const properties = cert[PROPERITES];
            const page = await this.page(cert[FIELD_ID]) as any;
            await sleep(SLEEP);
            certs.push({
                icon: page.icon,
                name: this.getNotionTitle(properties[FIELD_NAME]),
                type: this.getSelect(properties[FIELD_TYPE]),
                issueOrganization: this.getNotionRichText(properties[FIELD_ISSUING_ORGANIZATION]),
                issueDate: this.getDate(properties[FIELD_ISSUE_DATE])
            } as Cert);
        }

        return certs;
    }

    async all(): Promise<Cert[]> {
        return await this.convert(await this.fetchFromDatabase(process.env.CERT_DB_ID!));
    }
}