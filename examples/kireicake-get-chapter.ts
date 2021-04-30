import { KireicakeParser } from '../lib'

const url = `https://reader.kireicake.com/read/frieren_at_the_funeral/en/0/48`

;(async () => {
  const chapter = await KireicakeParser.getChapterByUrl(url)
  console.log('chapter:', chapter)
})()
