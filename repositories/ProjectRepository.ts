import type ProjectRepositoryInterface from './ProjectRepositoryInterface'
import NotionRepository from './NotionRepository';
import { 
    FIELD_BACKEND,
    FIELD_COMPANY_FORMATTED, 
    FIELD_FRONTEND, 
    FIELD_LANGUAGE, 
    FIELD_NAME, 
    FIELD_NOTE, 
    FIELD_PERIOD, 
    FIELD_RESPONSIBILITY, 
    FIELD_ROLE, 
    FIELD_TYPE, 
    FIELD_WEB_DB_SERVERS, 
    FIELD_WORKING_MONTH, 
    FIELD_WORKING_PERIOD, 
    PROPERITES 
} from './Constants';

export default class ProjectRepository extends NotionRepository implements ProjectRepositoryInterface {
    private convert(results: any[]): Project[] {
        const projects: Project[] = [];

        for (const project of results) {
            const properties = project[PROPERITES];
            projects.push({
                name: this.getNotionTitle(properties[FIELD_NAME]),
                responsibility: this.getNotionRichText(properties[FIELD_RESPONSIBILITY]),
                company: this.getFormulaString(properties[FIELD_COMPANY_FORMATTED]),
                workingMonths: this.getFormulaNumber(properties[FIELD_WORKING_MONTH]),
                workingPeriod: this.getFormulaString(properties[FIELD_WORKING_PERIOD]),
                language: this.getMultiSelect(properties[FIELD_LANGUAGE]),
                backend: this.getMultiSelect(properties[FIELD_BACKEND]),
                frontend: this.getMultiSelect(properties[FIELD_FRONTEND]),
                webDbServer: this.getMultiSelect(properties[FIELD_WEB_DB_SERVERS]),
                type: this.getSelect(properties[FIELD_TYPE]),
                period: this.getDate(properties[FIELD_PERIOD]),
                role: this.getSelect(properties[FIELD_ROLE]),
                note: this.getNotionRichText(properties[FIELD_NOTE]),
            } as Project);
        }

        return projects;
    }

    async all(): Promise<Project[]> {
        return this.convert(await this.fetchFromDatabase(process.env.PROJECT_DB_ID!));
    }
}
