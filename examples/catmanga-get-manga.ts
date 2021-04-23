import { userAgentHelper } from '../lib'
import { CatmangaParser } from '../lib/parsers'

// const mangaId = 'saint'
const mangaId = 'bbq'
const userAgent = userAgentHelper.getRandom()

;(async () => {
  const manga = await CatmangaParser.getManga(mangaId, {
    userAgent,
  })
  console.log('manga:', manga)
})()
