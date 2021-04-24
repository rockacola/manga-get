"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuyaParser = void 0;
const axios_handler_1 = require("../handlers/axios-handler");
const BASE_URL = `https://guya.moe`;
class GuyaParser {
    static getDefaultBaseUrl() {
        return BASE_URL;
    }
    static getManga(mangaId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getMangaUrl(mangaId, {
                baseUrl: options.baseUrl,
            });
            const data = yield axios_handler_1.AxiosHandler.getPage(url, options.userAgent);
            const manga = {
                id: mangaId,
                title: data === null || data === void 0 ? void 0 : data.title,
                description: data === null || data === void 0 ? void 0 : data.description,
            };
            if (!!(data === null || data === void 0 ? void 0 : data.chapters)) {
                const chapterKeys = Object.keys(data === null || data === void 0 ? void 0 : data.chapters);
                const _chapters = [];
                for (const key of chapterKeys) {
                    _chapters.push({
                        id: key,
                        title: data === null || data === void 0 ? void 0 : data.chapters[key].title,
                    });
                }
                manga.chapters = _chapters;
            }
            return manga;
        });
    }
    static getChapter(mangaId, chapterId, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getMangaUrl(mangaId, {
                baseUrl: options.baseUrl,
            });
            const data = yield axios_handler_1.AxiosHandler.getPage(url, options.userAgent);
            const chapterData = data === null || data === void 0 ? void 0 : data.chapters[chapterId];
            if (!chapterData) {
                throw new Error('Chapter data not found.');
            }
            const chapter = {
                id: chapterId,
                title: chapterData.title,
                pages: [],
            };
            const chapterFolder = chapterData.folder;
            const targetGroupKey = Object.keys(chapterData.groups)[0];
            for (const filename of chapterData.groups[targetGroupKey]) {
                (_a = chapter.pages) === null || _a === void 0 ? void 0 : _a.push({
                    relativePath: `/media/manga/${mangaId}/chapters/${chapterFolder}/${targetGroupKey}/${filename}`,
                });
            }
            return chapter;
        });
    }
    static getMangaUrl(mangaId, options = {}) {
        const baseUrl = options.baseUrl || BASE_URL;
        return `${baseUrl}/api/series/${mangaId}`;
    }
    static getChapterUrl(mangaId, chapterId, options) {
        const baseUrl = options.baseUrl || BASE_URL;
        return `${baseUrl}/read/manga/${mangaId}/${chapterId}`;
    }
    static getUrl(relativePath, options = {}) {
        const baseUrl = options.baseUrl || BASE_URL;
        return `${baseUrl}${relativePath}`;
    }
}
exports.GuyaParser = GuyaParser;
//# sourceMappingURL=guya-parser.js.map