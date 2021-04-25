import { GuyaParser } from '../lib'

// const mangaId = 'Kaguya-Wants-To-Be-Confessed-To'
const mangaId = 'Oshi-no-Ko'

;(async () => {
  const manga = await GuyaParser.getManga(mangaId)
  console.log('manga:', manga)
})()
