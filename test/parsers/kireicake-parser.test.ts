import { KireicakeParser } from '../../lib'

const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36`

describe('KireicakeParser', () => {
  test('getMangaUrl', () => {
    const mangaId = 'frieren_at_the_funeral'
    const url = KireicakeParser.getMangaUrl(mangaId)
    expect(url).toBe(
      `https://reader.kireicake.com/series/frieren_at_the_funeral`
    )
  })

  test('getMangaUrl with basePath override', () => {
    const baseUrl = `https://beta.kireicake.com`
    const mangaId = 'mock'
    const url = KireicakeParser.getMangaUrl(mangaId, { baseUrl })
    expect(url).toBe(`https://beta.kireicake.com/series/mock`)
  })

  test('getUrl', () => {
    const relativePath = '/series/frieren_at_the_funeral'
    const url = KireicakeParser.getUrl(relativePath)
    expect(url).toBe(
      `https://reader.kireicake.com/series/frieren_at_the_funeral`
    )
  })

  test('getManga', async () => {
    const mangaId = 'frieren_at_the_funeral'
    const manga = await KireicakeParser.getManga(mangaId, { userAgent })
    expect(manga.id).toBe(mangaId)
    expect(manga.title).toBe('Frieren at the Funeral')
    expect(manga.chapters?.length).toBeGreaterThan(0)
  })

  test('getChapterByUrl', async () => {
    const url =
      'https://reader.kireicake.com/read/frieren_at_the_funeral/en/0/48/'
    const chapter = await KireicakeParser.getChapterByUrl(url, { userAgent })
    expect(chapter.pages?.length).toBeGreaterThan(0)
  })
})
