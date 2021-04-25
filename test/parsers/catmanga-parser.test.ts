import { CatmangaParser } from '../../lib'

const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36`

describe('CatmangaParser', () => {
  test('getMangaUrl', () => {
    const mangaId = 'mock'
    const url = CatmangaParser.getMangaUrl(mangaId)
    expect(url).toBe(`https://catmanga.org/series/mock`)
  })

  test('getMangaUrl with basePath override', () => {
    const baseUrl = `https://beta.catmanga.org`
    const mangaId = 'mock'
    const url = CatmangaParser.getMangaUrl(mangaId, { baseUrl })
    expect(url).toBe(`https://beta.catmanga.org/series/mock`)
  })

  test('getUrl', () => {
    const relativePath = '/series/bbq/1'
    const url = CatmangaParser.getUrl(relativePath)
    expect(url).toBe('https://catmanga.org/series/bbq/1')
  })

  test('getManga', async () => {
    const mangaId = 'bbq'
    const manga = await CatmangaParser.getManga(mangaId, { userAgent })
    expect(manga.id).toBe(mangaId)
    expect(manga.title).toBe('A Rare Marriage: How to Grill Our Love')
    expect(manga.chapters?.length).toBeGreaterThan(0)
  })

  test('getChapter', async () => {
    const mangaId = 'bbq'
    const chapterId = '1'
    const chapter = await CatmangaParser.getChapter(mangaId, chapterId, {
      userAgent,
    })
    expect(chapter.pages?.length).toBeGreaterThan(0)
  })

  test('getChapterByRelativePath', async () => {
    const relativePath = '/series/amagami/1'
    const chapter = await CatmangaParser.getChapterByRelativePath(
      relativePath,
      { userAgent }
    )
    expect(chapter.pages?.length).toBeGreaterThan(0)
  })
})
