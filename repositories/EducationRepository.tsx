import EducationRepositoryInterface from "./EducationRepositoryInterface";
import NotionRepository from "./NotionRepository";
import {
    PROPERITES,
    FIELD_NAME,
    FIELD_DEGREE,
    FIELD_FIELD_OF_STUDY,
    FIELD_START,
    FIELD_END,
    FIELD_ID,
    SLEEP
} from './Constants';
import sleep from "sleep-promise";

export default class EducationRepository extends NotionRepository implements EducationRepositoryInterface {
    private async convert(results: any[]): Promise<Education[]> {
        const educations: Education[] = [];

        for (const education of results) {
            const properties = education[PROPERITES];
            const page = await this.page(education[FIELD_ID]) as any;
            await sleep(SLEEP);
            educations.push({
                icon: page.icon,
                name: this.getNotionTitle(properties[FIELD_NAME]),
                degree: this.getNotionRichText(properties[FIELD_DEGREE]),
                fieldOfStudy: this.getNotionRichText(properties[FIELD_FIELD_OF_STUDY]),
                start: this.getDate(properties[FIELD_START]),
                end: this.getDate(properties[FIELD_END])
            } as Education);
        }

        return educations;
    }

    async all(): Promise<Education[]> {
        return await this.convert(await this.fetchFromDatabase(process.env.EDUCATION_DB_ID!));
    }
}