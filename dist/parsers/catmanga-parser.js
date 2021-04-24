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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatmangaParser = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const axios_handler_1 = require("../handlers/axios-handler");
const BASE_URL = `https://catmanga.org`;
class CatmangaParser {
    static getDefaultBaseUrl() {
        return BASE_URL;
    }
    static getManga(mangaId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getMangaUrl(mangaId, {
                baseUrl: options.baseUrl,
            });
            const doc = yield axios_handler_1.AxiosHandler.getPage(url, options.userAgent);
            const $ = cheerio_1.default.load(doc);
            const manga = {
                id: mangaId,
                title: $('[class^="series_seriesTitle__"]').text(),
                description: $('[class^="series_seriesDesc__"]').text(),
                chapters: [],
            };
            $('[class^="chaptertile_element__"]').each((index, el) => {
                var _a;
                const $chapter = cheerio_1.default.load(el);
                (_a = manga.chapters) === null || _a === void 0 ? void 0 : _a.push({
                    mangaId,
                    relativePath: $chapter('[class^="chaptertile_element__"]').attr('href'),
                    title: $chapter('[class^="chaptertile_elementTitle__"]').text(),
                    subtitle: $chapter('[class^="chaptertile_elementText__"]').text(),
                });
            });
            return manga;
        });
    }
    static getChapter(mangaId, chapterId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getChapterUrl(mangaId, chapterId, {
                baseUrl: options.baseUrl,
            });
            const chapter = yield this.getChapterByUrl(url, options);
            return chapter;
        });
    }
    static getChapterByRelativePath(relativePath, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.getUrl(relativePath, { baseUrl: options.baseUrl });
            const chapter = yield this.getChapterByUrl(url, options);
            return chapter;
        });
    }
    static getMangaUrl(mangaId, options = {}) {
        const baseUrl = options.baseUrl || BASE_URL;
        return `${baseUrl}/series/${mangaId}`;
    }
    static getChapterUrl(mangaId, chapterId, options = {}) {
        const baseUrl = options.baseUrl || BASE_URL;
        return `${baseUrl}/series/${mangaId}/${chapterId}`;
    }
    static getUrl(relativePath, options = {}) {
        const baseUrl = options.baseUrl || BASE_URL;
        return `${baseUrl}${relativePath}`;
    }
    static getChapterByUrl(url, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield axios_handler_1.AxiosHandler.getPage(url, options.userAgent);
            const $ = cheerio_1.default.load(doc);
            const chapter = {
                pages: [],
            };
            const scriptText = $('#__NEXT_DATA__').html();
            const scriptData = JSON.parse(scriptText);
            const scriptDataPages = scriptData.props.pageProps.pages;
            for (const p of scriptDataPages) {
                (_a = chapter.pages) === null || _a === void 0 ? void 0 : _a.push({
                    fullPath: p,
                });
            }
            return chapter;
        });
    }
}
exports.CatmangaParser = CatmangaParser;
//# sourceMappingURL=catmanga-parser.js.map