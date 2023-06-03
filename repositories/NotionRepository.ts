import { GetPageResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Client } from '@notionhq/client';
import { container } from "tsyringe";

export default class NotionRepository {
    readonly notion!: Client;

    constructor() {
        this.notion = container.resolve<Client>('NotionClient');
    }

    async database(id: string, startCursor?: string): Promise<QueryDatabaseResponse> {
        if (!startCursor) {
            return await this.notion.databases.query({ database_id: id, start_cursor: startCursor });
        }
        return await this.notion.databases.query({ database_id: id });
    }

    async page(id: string): Promise<GetPageResponse> {
        return await this.notion.pages.retrieve({ page_id: id });
    }

    protected getNotionTitle({ title }: NotionTitle): NotionText[] {
        return title;
    }

    protected getNotionRichText({ rich_text }: NotionRichText): NotionText[] {
        return rich_text;
    }

    protected getFormulaString({ formula: { string } }: NotionFormulaString): string {
        return string;
    }

    protected getFormulaNumber({ formula: { number } }: NotionFormulaNumber): number {
        return number;
    }

    protected getSelect({ select }: NotionSelect): SelectItem {
        return select;
    }

    protected getMultiSelect({ multi_select }: NotionMultiSelect): SelectItem[] {
        return multi_select;
    }

    protected getDate({ date }: NotionDate): Period {
        return date;
    }
}