import NotionRepository from "./NotionRepository";
import ProfileRepositoryInterface from "./ProfileRepositoryInterface";

export default class ProfileRepository extends NotionRepository implements ProfileRepositoryInterface {
    async profile(): Promise<Profile> {
        const page = await this.page(process.env.PROFILE_PAGE_ID!) as any;
        const list = await this.blockChildren(process.env.PROFILE_BLOCK_ID!) as any;

        const aboutMeBlockId: string = list.results[0].id;
        const contactBlockId: string = list.results[1].id;
        const languageBlockId: string = list.results[2].id;

        return {
            name: this.getNotionTitle(page.properties.title),
            icon: page.icon,
            cover: page.cover,
            aboutMe: await this.getBlockBulletedListItem(aboutMeBlockId),
            contacts: await this.getBlockParagraph(contactBlockId),
            languages: await this.getBlockParagraph(languageBlockId),
        };
    }
}
