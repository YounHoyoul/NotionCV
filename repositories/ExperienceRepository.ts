import { PROPERITES, FIELD_NAME, FIELD_TYPE, FIELD_ROLE, FIELD_ADDRESS, FIELD_PERIOD, FIELD_ID } from "./Constants";
import ExperienceRepositoryInterface from "./ExperienceRepositoryInterface";
import NotionRepository from "./NotionRepository";

export default class ExperienceRepository extends NotionRepository implements ExperienceRepositoryInterface {
    private async convert(results: any[]): Promise<Experience[]> {
        const experiences: Experience[] = [];

        for (const experience of results) {
            const properties = experience[PROPERITES];
            const page = await this.page(experience[FIELD_ID]) as any;
            experiences.push({
                icon: page.icon,
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
        return await this.convert(await this.fetchFromDatabase(process.env.EXPERIENCE_DB_ID!));
    }
}