import type ProjectRepositoryInterface from './ProjectRepositoryInterface'
import NotionRepository from './NotionRepository';

export default class ProjectRepository extends NotionRepository implements ProjectRepositoryInterface {
    async _fetchData() : Promise<any[]> {
        const db_id = process.env.PROJECT_DB_ID as string;
        let results: any[] = [];
        let response = await this.database(db_id);

        results = [...results, ...response.results];
        while (response.has_more) {
            response = await this.database(db_id, response.next_cursor as string);
            results = [...results, ...response.results];
        }

        return results;
    }

    _convert(results: any[]) : Project[] {
        const projects: Project[] = [];

        for (const project of results) {
            projects.push({
                Name : this.getNotionTitle(project['properties']['Name']),
                Responsibility: this.getNotionRichText(project['properties']['Responsibility']),
                Company: this.getFormulaString(project['properties']['Company Formatted']),
                WorkingMonths: this.getFormulaNumber(project['properties']['Working Month']),
                WorkingPeriod: this.getFormulaString(project['properties']['Working Period']),
                Language: this.getMultiSelect(project['properties']['Language']),
                Backend: this.getMultiSelect(project['properties']['Backend']),
                Frontend: this.getMultiSelect(project['properties']['Frontend']),
                WebDbServer: this.getMultiSelect(project['properties']['Web/DB Servers']),
                Type: this.getSelect(project['properties']['Type']),
                Period: this.getDate(project['properties']['Period']),
                Role: this.getSelect(project['properties']['Role']),
            } as Project);
        }

        return projects;
    }

    async all(): Promise<Project[]> {
        return this._convert(await this._fetchData());
    }
}
