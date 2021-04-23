export interface Manga {
    id: string;
    title?: string;
    description?: string;
    chapters?: Chapter[];
}
export interface Chapter {
    id?: string;
    mangaId?: string;
    title?: string;
    subtitle?: string;
    relativePath?: string;
    fullPath?: string;
    scanlationGroup?: string;
    updatedAt?: Date;
    pages?: Page[];
}
export interface Page {
    relativePath?: string;
    fullPath?: string;
    title?: string;
}
