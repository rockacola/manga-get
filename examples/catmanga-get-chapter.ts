import { CatmangaParser } from '../lib'

// const mangaId = 'saint'
const mangaId = 'bbq'
const chapterId = '2'

;(async () => {
  const chapter = await CatmangaParser.getChapter(mangaId, chapterId)
  console.log('chapter:', chapter)
})()
