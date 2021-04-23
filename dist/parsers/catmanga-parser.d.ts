import { CatmangaUrlParserOptions, Chapter, GetChapterOptions, GetMangaOptions, Manga } from '../interfaces';
export declare class CatmangaParser {
    static getManga(mangaId: string, options?: GetMangaOptions): Promise<Manga>;
    static getChapter(mangaId: string, chapterId: string, options?: GetChapterOptions): Promise<Chapter>;
    static getChapterByRelativePath(relativePath: string, options?: GetChapterOptions): Promise<Chapter>;
    static getMangaUrl(mangaId: string, options?: CatmangaUrlParserOptions): string;
    static getChapterUrl(mangaId: string, chapterId: string, options?: CatmangaUrlParserOptions): string;
    static getUrl(relativePath: string, options?: CatmangaUrlParserOptions): string;
    private static getChapterByUrl;
}
