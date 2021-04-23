import { Chapter, GetChapterOptions, GetMangaOptions, GuyaUrlParserOptions, Manga } from '../interfaces';
export declare class GuyaParser {
    static getManga(mangaId: string, options?: GetMangaOptions): Promise<Manga>;
    static getChapter(mangaId: string, chapterId: string, options?: GetChapterOptions): Promise<Chapter>;
    static getMangaUrl(mangaId: string, options?: GuyaUrlParserOptions): string;
    static getChapterUrl(mangaId: string, chapterId: string, options: GuyaUrlParserOptions): string;
    static getUrl(relativePath: string, options?: GuyaUrlParserOptions): string;
}
