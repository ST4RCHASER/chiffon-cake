import axios from 'axios';
import { PageType } from '../types/chapterPage.types';
import { IndexMedia, Media, MediaType } from '../types/media.types';
import { MediaChapter } from '../types/mediaChapter.types';
class RibbonService {
    indexs: IndexMedia[] = [];
    medias: Media[] = [];

    constructor() {
        //Run every 4 hours
        setInterval(() => {
            this.downloadIndexs();
        }, 1000 * 60 * 60 * 4);
    }

    async downloadIndexs() {
        try {
            const indexs = [];
            const TOTAL_WORKERS = parseInt(process.env.TOTAL_WORKERS); //Run 0-19
            const TOTAL_SITES = parseInt(process.env.TOTAL_SITES); //Run 1-19
            for (let i = 1; i <= TOTAL_SITES; i++) {
                for (let j = 0; j < TOTAL_WORKERS; j++) {
                    const url = `${process.env.BASE_RIBBON_URL}/${i}/${j}-index.json`;
                    console.log(`Ribbon | Downloading ${url}`);
                    const result = await axios.get(url);
                    for (const index of result.data) {
                        indexs.push({
                            siteId: i,
                            mediaId: index.mangaId,
                            title: index.title,
                            otherTitles: index.otherTitles,
                            tags: index.tags,
                            thumbnail: index.thumbnail,
                            year: index.year,
                            lastUpdated: new Date(index.lastUpdated),
                            status: index.status,
                            totalChapters: index.totalChapters,
                            totalPages: index.totalPages
                        });
                    }
                }
            }
            console.log(`Ribbon | ${indexs.length} indexs downloaded`);
            this.indexs = indexs;
            this.medias = [];
        } catch (e) {
            console.log(e);
            console.log('Ribbon | Error downloading indexs');
        }
    }
    getMediaFromIndex(siteId: number, mediaId: string): IndexMedia | undefined {
        return this.indexs.find(index => index.siteId === siteId && index.mediaId === mediaId);
    }
    getMedia(siteId: number, mediaId: string): Promise<Media> {
        return new Promise(async (resolve, reject) => {
            try {
                const media = this.medias.find(media => media.siteId === siteId && media.mediaId === mediaId);
                if (media) return resolve(media);
                const index = this.getMediaFromIndex(siteId, mediaId);
                if (!index) return reject('Media not found');
                const url = `${process.env.BASE_RIBBON_URL}/${siteId}/${index.mediaId}.json`;
                console.log(`Ribbon | Downloading media ${url}`);
                const { data } = await axios.get(url);
                if (data) {
                    const chapters: MediaChapter[] = data.chapters.map(chapter => {
                        return {
                            siteId: chapter.siteId,
                            mediaId: chapter.mangaId,
                            chapterId: chapter.chapterId,
                            name: chapter.name,
                            chapterCount: chapter.chapterCount,
                            lastUpdated: new Date(chapter.lastUpdated),
                            pages: chapter.pages.map(page => {
                                return {
                                    siteId: page.siteId,
                                    mediaId: page.mangaId,
                                    chapterId: page.chapterId,
                                    pageId: page.pageId,
                                    content: page.url,
                                    name: page.name,
                                    pageType: PageType.IMAGE,
                                };
                            })
                        };
                    })
                    const newMedia: Media = {
                        siteId: data.siteId,
                        mediaId: data.mangaId,
                        mediaType: MediaType.MANGA,
                        totalChapters: data.chapters.length,
                        chapters,
                        created: new Date(data.created),
                        lastUpdated: new Date(data.lastUpdated),
                        title: data.title,
                        otherTitles: data.otherTitles,
                        status: data.status,
                        description: data.description,
                        year: data.year,
                        thumbnail: data.thumbnail,
                        writer: data.writer,
                        artist: data.artist,
                        tags: data.tags,
                        publisher: data.publisher,
                    }
                    this.medias.push(newMedia);
                    return resolve(newMedia);
                }
                return reject('Media not found');
            } catch (e) {
                return reject(e);
            }
        });
    }
    getLatestUpdatedMedia(siteId?: number): IndexMedia[] {
        try {
            const indexs = this.indexs.filter(index => {
                if (siteId) return index.siteId === siteId;
                return true;
            }).sort((a, b) => {
                return b.lastUpdated.getTime() - a.lastUpdated.getTime();
            });
            return indexs;
        } catch (e) {
            throw e;
        }
    }
}

export default RibbonService;