import RibbonService from "../services/ribbon.service";
import { Arg, Query, Resolver } from "type-graphql";
import { IndexMedia, Media } from "../types/media.types";
import { Page } from "../types/page.types";

@Resolver()
export class MediaResolver {
    ribbon: RibbonService;
    constructor() {
        this.ribbon = new RibbonService();
        this.ribbon.downloadIndexs();
    }
    @Query(returns => Media)
    async media(@Arg("siteId") siteId: number, @Arg("mediaId") mediaId: string): Promise<Media> {
        return this.ribbon.getMedia(siteId, mediaId);
    }
    @Query(returns => IndexMedia)
    mediaFromIndex(@Arg("siteId") siteId: number, @Arg("mediaId") mediaId: string): IndexMedia {
        return this.ribbon.getMediaFromIndex(siteId, mediaId);
    }

    @Query(returns => [IndexMedia])
    latestUpdatedMedia(@Arg("siteId", { nullable: true }) siteId?: number, @Arg("page", { defaultValue: 1 }) page: number = 1): IndexMedia[] { 
        return this.ribbon.getLatestUpdatedMedia(siteId).slice((page - 1) * 20, page * 20);
    }

    // @Query(returns => Page)
    // async page(@Arg("page") page: number, @Arg("page") perPage: number): Page {
    //     //If query latest updated media, then use ribbon.getLatestUpdatedMediaPage()
    //     return this.ribbon.getMediaPage(page, perPage);
    // }
}