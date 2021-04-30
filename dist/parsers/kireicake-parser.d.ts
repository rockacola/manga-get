import { Chapter, GetChapterOptions, GetMangaOptions, KireicakeUrlParserOptions, Manga } from '../interfaces';
export declare class KireicakeParser {
    static getDefaultBaseUrl(): string;
    static getManga(mangaId: string, options?: GetMangaOptions): Promise<Manga>;
    static getChapter(mangaId: string, chapterId: string, options?: GetChapterOptions): Promise<Chapter>;
    static getChapterByRelativePath(relativePath: string, options?: GetChapterOptions): Promise<Chapter>;
    static getMangaUrl(mangaId: string, options?: KireicakeUrlParserOptions): string;
    static getChapterUrl(mangaId: string, chapterId: string, options?: KireicakeUrlParserOptions): string;
    static getUrl(relativePath: string, options?: KireicakeUrlParserOptions): string;
    static getChapterByUrl(url: string, options?: GetChapterOptions): Promise<Chapter>;
    private static getScriptBodyContainsChapterDetails;
    private static extractPagesObject;
}
