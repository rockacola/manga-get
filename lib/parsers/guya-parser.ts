import { AxiosHandler } from '../handlers/axios-handler'
import {
  Chapter,
  GetChapterOptions,
  GetMangaOptions,
  GuyaUrlParserOptions,
  Manga,
} from '../interfaces'

const BASE_URL = `https://guya.moe`

export class GuyaParser {
  static async getManga(
    mangaId: string,
    options: GetMangaOptions = {}
  ): Promise<Manga> {
    const url = this.getMangaUrl(mangaId, {
      baseUrl: options.baseUrl,
    })
    const data: any = await AxiosHandler.getPage(url, options.userAgent)

    const manga: Manga = {
      id: mangaId,
      title: data?.title,
      description: data?.description,
    }

    if (!!data?.chapters) {
      const chapterKeys = Object.keys(data?.chapters)
      const _chapters: Chapter[] = []
      for (const key of chapterKeys) {
        _chapters.push({
          id: key,
          title: data?.chapters[key].title,
        })
      }
      manga.chapters = _chapters
    }

    return manga
  }

  static async getChapter(
    mangaId: string,
    chapterId: string,
    options: GetChapterOptions = {}
  ): Promise<Chapter> {
    const url = this.getMangaUrl(mangaId, {
      baseUrl: options.baseUrl,
    })
    const data: any = await AxiosHandler.getPage(url, options.userAgent)
    const chapterData: any = data?.chapters[chapterId]
    if (!chapterData) {
      throw new Error('Chapter data not found.')
    }

    const chapter: Chapter = {
      id: chapterId,
      title: chapterData.title,
      pages: [],
    }

    const chapterFolder: string = chapterData.folder
    const targetGroupKey: string = Object.keys(chapterData.groups)[0]

    for (const filename of chapterData.groups[targetGroupKey]) {
      chapter.pages?.push({
        relativePath: `/media/manga/${mangaId}/chapters/${chapterFolder}/${targetGroupKey}/${filename}`,
      })
    }

    return chapter
  }

  static getMangaUrl(
    mangaId: string,
    options: GuyaUrlParserOptions = {}
  ): string {
    const baseUrl = options.baseUrl || BASE_URL
    return `${baseUrl}/api/series/${mangaId}`
  }

  static getChapterUrl(
    mangaId: string,
    chapterId: string,
    options: GuyaUrlParserOptions
  ): string {
    const baseUrl = options.baseUrl || BASE_URL
    return `${baseUrl}/read/manga/${mangaId}/${chapterId}`
  }

  static getUrl(
    relativePath: string,
    options: GuyaUrlParserOptions = {}
  ): string {
    const baseUrl = options.baseUrl || BASE_URL
    return `${baseUrl}${relativePath}`
  }
}
