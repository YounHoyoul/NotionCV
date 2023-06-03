import { PROPERITES, FIELD_NAME, FIELD_TYPE, FIELD_ROLE, FIELD_ADDRESS, FIELD_PERIOD } from "./Constants";
import ExperienceRepositoryInterface from "./ExperienceRepositoryInterface";
import NotionRepository from "./NotionRepository";

export default class ExperienceRepository extends NotionRepository implements ExperienceRepositoryInterface {
    private convert(results: any[]): Experience[] {
        const experiences: Experience[] = [];

        for (const experience of results) {
            const properties = experience[PROPERITES];
            experiences.push({
                name: this.getNotionTitle(properties[FIELD_NAME]),
                type: this.getSelect(properties[FIELD_TYPE]),
                role: this.getSelect(properties[FIELD_ROLE]),
                address: this.getNotionRichText(properties[FIELD_ADDRESS]),
                workingPeriod: this.getFormulaString(properties[FIELD_PERIOD])
            } as Experience);
        }

        return experiences;
    }

    async all(): Promise<Experience[]> {
        return this.convert(await this.fetchFromDatabase(process.env.EXPERIENCE_DB_ID!));
    }
}