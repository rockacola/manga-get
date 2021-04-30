import cheerio from 'cheerio'
import { AxiosHandler } from '../handlers/axios-handler'
import {
  Chapter,
  GetChapterOptions,
  GetMangaOptions,
  KireicakeUrlParserOptions,
  Manga,
} from '../interfaces'

const BASE_URL = `https://reader.kireicake.com`

export class KireicakeParser {
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
      title: $('#content .title').first().text().trim(),
      description: $('#content .info > ul > li').eq(1).text().trim(),
      chapters: [],
    }

    $('#content .list .element').each((index, el) => {
      const $chapter = cheerio.load(el)
      manga.chapters?.push({
        mangaId,
        fullPath: $chapter('.title a').attr('href'),
        title: $chapter('.title a').attr('title'),
      })
    })

    return manga
  }

  static async getChapter(
    mangaId: string,
    chapterId: string,
    options: GetChapterOptions = {}
  ): Promise<Chapter> {
    throw new Error('Not implemented.')
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
    options: KireicakeUrlParserOptions = {}
  ): string {
    const baseUrl = options.baseUrl || BASE_URL
    return `${baseUrl}/series/${mangaId}`
  }

  // static getChapterUrl(
  //   mangaId: string,
  //   chapterId: string,
  //   options: KireicakeUrlParserOptions = {}
  // ): string {
  //   // TODO: support for 'partial chapter'
  //   const baseUrl = options.baseUrl || BASE_URL
  //   return `${baseUrl}/series/${mangaId}/en/0/${chapterId}`
  // }

  static getUrl(
    relativePath: string,
    options: KireicakeUrlParserOptions = {}
  ): string {
    const baseUrl = options.baseUrl || BASE_URL
    return `${baseUrl}${relativePath}`
  }

  static async getChapterByUrl(
    url: string,
    options: GetChapterOptions = {}
  ): Promise<Chapter> {
    const doc = await AxiosHandler.getPage(url, options.userAgent)
    const $ = cheerio.load(doc)

    const chapter: Chapter = {
      pages: [],
    }

    const targetScriptBody = this.getScriptBodyContainsChapterDetails($)
    // console.log('targetScriptBody:', targetScriptBody)
    const dataArr = this.extractPagesObject(targetScriptBody)
    // console.log('dataObj:', dataObj)

    for (const data of dataArr) {
      chapter.pages?.push({
        fullPath: data.url,
        title: data.filename,
      })
    }

    return chapter
  }

  private static getScriptBodyContainsChapterDetails($: cheerio.Root): string {
    // console.log('getScriptBodyContainsChapterDetails triggered.')

    let matchBody: string = ''
    $('script').each((index, el) => {
      const $script = cheerio.load(el)
      const scriptBody = $script.html()
      const occurences = (
        scriptBody.replace(/[ ]/gi, '').match(/varpages/gi) || []
      ).length
      if (occurences > 0) {
        matchBody = scriptBody
      }
    })

    return matchBody
  }

  private static extractPagesObject(scriptBody: string): any[] {
    // console.log('extractPagesObject triggered.')

    try {
      const re = /varpages=(.*?);/g
      const res = scriptBody.replace(/[ ]/g, '').match(re) || []
      // console.log('res:', res)
      const dataStr = res[0].replace('varpages=', '').slice(0, -1)
      const dataObj = JSON.parse(dataStr)
      return dataObj
    } catch (err) {
      console.log('Error in extractPagesObject. err.message:', err.message)
      return []
    }
  }
}
