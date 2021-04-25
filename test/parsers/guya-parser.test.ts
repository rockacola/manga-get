import { GuyaParser } from '../../lib'

const userAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36`

describe('GuyaParser', () => {
  test('getMangaUrl', () => {
    const mangaId = 'Kaguya-Wants-To-Be-Confessed-To'
    const url = GuyaParser.getMangaUrl(mangaId)
    expect(url).toBe(
      `https://guya.moe/api/series/Kaguya-Wants-To-Be-Confessed-To`
    )
  })

  test('getMangaUrl with basePath override', () => {
    const baseUrl = `https://beta.guya.moe`
    const mangaId = 'Kaguya-Wants-To-Be-Confessed-To'
    const url = GuyaParser.getMangaUrl(mangaId, { baseUrl })
    expect(url).toBe(
      `https://beta.guya.moe/api/series/Kaguya-Wants-To-Be-Confessed-To`
    )
  })

  test('getUrl', () => {
    const relativePath = '/read/manga/Oshi-no-Ko/41'
    const url = GuyaParser.getUrl(relativePath)
    expect(url).toBe(`https://guya.moe/read/manga/Oshi-no-Ko/41`)
  })

  test('getManga', async () => {
    const mangaId = 'Oshi-no-Ko'
    const manga = await GuyaParser.getManga(mangaId, { userAgent })
    expect(manga.id).toBe(mangaId)
    expect(manga.title).toBe('Oshi no Ko')
    expect(manga.chapters?.length).toBeGreaterThan(0)
  })

  test('getChapter', async () => {
    const mangaId = 'Oshi-no-Ko'
    const chapterId = '12'
    const chapter = await GuyaParser.getChapter(mangaId, chapterId, {
      userAgent,
    })
    expect(chapter.id).toBe(chapterId)
    expect(chapter.pages?.length).toBeGreaterThan(0)
  })
})
