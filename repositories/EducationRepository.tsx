import EducationRepositoryInterface from "./EducationRepositoryInterface";
import NotionRepository from "./NotionRepository";
import {
    PROPERITES,
    FIELD_NAME,
    FIELD_DEGREE,
    FIELD_FIELD_OF_STUDY,
    FIELD_START,
    FIELD_END
} from './Constants';

export default class EducationRepository extends NotionRepository implements EducationRepositoryInterface {
    private convert(results: any[]): Education[] {
        const educations: Education[] = [];

        for (const education of results) {
            const properties = education[PROPERITES];
            educations.push({
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
        return this.convert(await this.fetchFromDatabase(process.env.EDUCATION_DB_ID!));
    }
}