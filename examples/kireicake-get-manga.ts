import { KireicakeParser } from '../lib/parsers'

const mangaId = 'frieren_at_the_funeral'

;(async () => {
  const manga = await KireicakeParser.getManga(mangaId)
  console.log('manga:', manga)
})()
