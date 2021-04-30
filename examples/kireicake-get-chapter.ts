import { KireicakeParser } from '../lib'

const url = `https://reader.kireicake.com/read/frieren_at_the_funeral/en/0/48`
const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:87.0) Gecko/20100101 Firefox/87.0'

;(async () => {
  const chapter = await KireicakeParser.getChapterByUrl(url, { userAgent })
  console.log('chapter:', chapter)
})()
