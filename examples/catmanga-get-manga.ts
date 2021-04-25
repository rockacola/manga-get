import { CatmangaParser } from '../lib/parsers'

// const mangaId = 'saint'
const mangaId = 'bbq'

;(async () => {
  const manga = await CatmangaParser.getManga(mangaId)
  console.log('manga:', manga)
})()
