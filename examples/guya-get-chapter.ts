import { GuyaParser } from '../lib'

const mangaId = 'Kaguya-Wants-To-Be-Confessed-To'
// const mangaId = 'Oshi-no-Ko'
const chapterId = '12'

;(async () => {
  const chapter = await GuyaParser.getChapter(mangaId, chapterId)
  console.log('chapter:', chapter)
})()
