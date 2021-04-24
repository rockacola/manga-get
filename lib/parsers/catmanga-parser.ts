import cheerio from 'cheerio'
import { AxiosHandler } from '../handlers/axios-handler'
import {
  CatmangaUrlParserOptions,
  Chapter,
  GetChapterOptions,
  GetMangaOptions,
  Manga,
} from '../interfaces'

const BASE_URL = `https://catmanga.org`

export class CatmangaParser {
  static getDefaultBaseUrl(): string {
    return BASE_URL
  }

  static async getManga(
    mangaId: string,
    options: GetMangaOptions = {}
  ): Promise<Manga> {
    const url = this.getMangaUrl(mangaId, {
      baseUrl: options.baseUrl,
    })

    const doc = await AxiosHandler.getPage(url, options.userAgent)
    const $ = cheerio.load(doc)

    const manga: Manga = {
      id: mangaId,
      title: $('[class^="series_seriesTitle__"]').text(),
      description: $('[class^="series_seriesDesc__"]').text(),
      chapters: [],
    }

    $('[class^="chaptertile_element__"]').each((index, el) => {
      const $chapter = cheerio.load(el)
      manga.chapters?.push({
        mangaId,
        relativePath: $chapter('[class^="chaptertile_element__"]').attr('href'),
        title: $chapter('[class^="chaptertile_elementTitle__"]').text(),
        subtitle: $chapter('[class^="chaptertile_elementText__"]').text(),
      })
    })

    return manga
  }

  static async getChapter(
    mangaId: string,
    chapterId: string,
    options: GetChapterOptions = {}
  ): Promise<Chapter> {
    const url = this.getChapterUrl(mangaId, chapterId, {
      baseUrl: options.baseUrl,
    })
    const chapter = await this.getChapterByUrl(url, options)
    return chapter
  }

  static async getChapterByRelativePath(
    relativePath: string,
    options: GetChapterOptions = {}
  ): Promise<Chapter> {
    const url = this.getUrl(relativePath, { baseUrl: options.baseUrl })
    const chapter = await this.getChapterByUrl(url, options)
    return chapter
  }

  static getMangaUrl(
    mangaId: string,
    options: CatmangaUrlParserOptions = {}
  ): string {
    const baseUrl = options.baseUrl || BASE_URL
    return `${baseUrl}/series/${mangaId}`
  }

  static getChapterUrl(
    mangaId: string,
    chapterId: string,
    options: CatmangaUrlParserOptions = {}
  ): string {
    const baseUrl = options.baseUrl || BASE_URL
    return `${baseUrl}/series/${mangaId}/${chapterId}`
  }

  static getUrl(
    relativePath: string,
    options: CatmangaUrlParserOptions = {}
  ): string {
    const baseUrl = options.baseUrl || BASE_URL
    return `${baseUrl}${relativePath}`
  }

  private static async getChapterByUrl(
    url: string,
    options: GetChapterOptions = {}
  ): Promise<Chapter> {
    const doc = await AxiosHandler.getPage(url, options.userAgent)
    const $ = cheerio.load(doc)

    const chapter: Chapter = {
      pages: [],
    }

    const scriptText = $('#__NEXT_DATA__').html()
    const scriptData = JSON.parse(scriptText!)
    const scriptDataPages = scriptData.props.pageProps.pages

    for (const p of scriptDataPages) {
      chapter.pages?.push({
        fullPath: p,
      })
    }

    return chapter
  }
}
