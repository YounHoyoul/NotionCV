import { GetBlockResponse, GetPageResponse, ListBlockChildrenResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { Client } from '@notionhq/client';
import { container } from "tsyringe";

export default class NotionRepository {
    readonly notion!: Client;

    constructor() {
        this.notion = container.resolve<Client>('NotionClient');
    }

    public async database(database_id: string, start_cursor?: string): Promise<QueryDatabaseResponse> {
        if (!start_cursor) {
            return await this.notion.databases.query({ database_id, start_cursor });
        }
        return await this.notion.databases.query({ database_id });
    }

    protected async fetchFromDatabase(db_id: string): Promise<any[]> {
        let results: any[] = [];
        let response = await this.database(db_id);

        results = [...results, ...response.results];
        while (response.has_more) {
            response = await this.database(db_id, response.next_cursor as string);
            results = [...results, ...response.results];
        }

        return results;
    }

    public async page(page_id: string): Promise<GetPageResponse> {
        return await this.notion.pages.retrieve({ page_id });
    }

    public async block(block_id: string): Promise<GetBlockResponse> {
        return await this.notion.blocks.retrieve({ block_id });
    }

    public async blockChildren(block_id: string): Promise<ListBlockChildrenResponse> {
        return await this.notion.blocks.children.list({ block_id });
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

    protected async getBlockBulletedListItem(block_id: string): Promise<NotionBulletedListItem[]> {
        const results: NotionBulletedListItem[] = [];
        const list = await this.blockChildren(block_id) as any;

        for (const item of list.results) {
            if (item.type === 'bulleted_list_item') {
                results.push(item.bulleted_list_item);
            }
        }

        return results;
    }

    protected async getBlockParagraph(block_id: string): Promise<NotionParagraph[]> {
        const results: NotionParagraph[] = [];
        const list = await this.blockChildren(block_id) as any;

        for (const item of list.results) {
            if (item.type === 'paragraph') {
                results.push(item.paragraph);
            }
        }

        return results;
    }
}