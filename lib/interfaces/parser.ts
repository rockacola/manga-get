import { AxiosProxyConfig } from 'axios'

interface BaseParserOptions {
  baseUrl?: string
  userAgent?: string
  proxy?: AxiosProxyConfig
}

export interface GetMangaOptions extends BaseParserOptions {}

export interface GetChapterOptions extends BaseParserOptions {}
