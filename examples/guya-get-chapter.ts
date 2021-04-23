import { GuyaParser, userAgentHelper } from '../lib'

const mangaId = 'Kaguya-Wants-To-Be-Confessed-To'
// const mangaId = 'Oshi-no-Ko'
const chapterId = '12'
const userAgent = userAgentHelper.getRandom()

;(async () => {
  const chapter = await GuyaParser.getChapter(mangaId, chapterId, {
    userAgent,
  })
  console.log('chapter:', chapter)
})()
