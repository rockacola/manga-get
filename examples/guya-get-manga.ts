import { GuyaParser, userAgentHelper } from '../lib'

// const mangaId = 'Kaguya-Wants-To-Be-Confessed-To'
const mangaId = 'Oshi-no-Ko'
const userAgent = userAgentHelper.getRandom()

;(async () => {
  const manga = await GuyaParser.getManga(mangaId, {
    userAgent,
  })
  console.log('manga:', manga)
})()
