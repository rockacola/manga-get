# Manga Get

A JavaScript library to access manga sites programmatically.

## Support Website

| id         | name                          | parser           |
| ---------- | ----------------------------- | ---------------- |
| `guya`     | [guya.moe](https://guya.moe/) | `GuyaParser`     |
| `catmanga` | [CatManga](catmanga.org/)     | `CatmangaParser` |

## Installation

Install the package directly from GitHub

```sh
$ npm i --save rockacola/manga-get
```

## Quick Start

Use it as a stateless function with TypeScript.

### Get manga from guya.moe

```ts
import { GuyaParser } from 'manga-get'

const mangaId = 'Oshi-no-Ko'

;(async () => {
  const manga = await GuyaParser.getManga(mangaId)
  console.log('manga:', manga)
})()
```

### Get chapter from guya.moe

```ts
import { GuyaParser } from '../lib'

const mangaId = 'Oshi-no-Ko'
const chapterId = '1'

;(async () => {
  const chapter = await GuyaParser.getChapter(mangaId, chapterId)
  console.log('chapter:', chapter)
})()
```

To see more TypeScript example usages, please check out the `/examples` directory.
