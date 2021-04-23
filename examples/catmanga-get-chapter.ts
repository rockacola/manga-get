import { CatmangaParser, userAgentHelper } from '../lib'

// const mangaId = 'saint'
const mangaId = 'bbq'
const chapterId = '2'
const userAgent = userAgentHelper.getRandom()

;(async () => {
  const chapter = await CatmangaParser.getChapter(mangaId, chapterId, {
    userAgent,
  })
  console.log('chapter:', chapter)
})()
