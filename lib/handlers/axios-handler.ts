import axios, { AxiosProxyConfig } from 'axios'

export class AxiosHandler {
  static async getPage(
    url: string,
    userAgent?: string,
    proxy?: AxiosProxyConfig
  ): Promise<string> {
    const res = await axios.get(url, {
      headers: {
        'User-Agent': userAgent,
      },
      proxy,
    })
    return res.data
  }
}
