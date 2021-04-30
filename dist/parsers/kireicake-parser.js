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
exports.KireicakeParser = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const axios_handler_1 = require("../handlers/axios-handler");
const BASE_URL = `https://reader.kireicake.com`;
class KireicakeParser {
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
                title: $('#content .title').first().text().trim(),
                description: $('#content .info > ul > li').eq(1).text().trim(),
                chapters: [],
            };
            $('#content .list .element').each((index, el) => {
                var _a;
                const $chapter = cheerio_1.default.load(el);
                (_a = manga.chapters) === null || _a === void 0 ? void 0 : _a.push({
                    mangaId,
                    fullPath: $chapter('.title a').attr('href'),
                    title: $chapter('.title a').attr('title'),
                });
            });
            return manga;
        });
    }
    static getChapter(mangaId, chapterId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented.');
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
        throw new Error('Not implemented.');
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
            const targetScriptBody = this.getScriptBodyContainsChapterDetails($);
            const dataArr = this.extractPagesObject(targetScriptBody);
            for (const data of dataArr) {
                (_a = chapter.pages) === null || _a === void 0 ? void 0 : _a.push({
                    fullPath: data.url,
                    title: data.filename,
                });
            }
            return chapter;
        });
    }
    static getScriptBodyContainsChapterDetails($) {
        let matchBody = '';
        $('script').each((index, el) => {
            const $script = cheerio_1.default.load(el);
            const scriptBody = $script.html();
            const occurences = (scriptBody.replace(/[ ]/gi, '').match(/varpages/gi) || []).length;
            if (occurences > 0) {
                matchBody = scriptBody;
            }
        });
        return matchBody;
    }
    static extractPagesObject(scriptBody) {
        try {
            const re = /varpages=(.*?);/g;
            const res = scriptBody.replace(/[ ]/g, '').match(re) || [];
            const dataStr = res[0].replace('varpages=', '').slice(0, -1);
            const dataArr = JSON.parse(dataStr);
            return dataArr;
        }
        catch (err) {
            console.log('Error in extractPagesObject. err.message:', err.message);
            return [];
        }
    }
}
exports.KireicakeParser = KireicakeParser;
//# sourceMappingURL=kireicake-parser.js.map