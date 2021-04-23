import axios from 'axios'

export class AxiosHandler {
  static async getPage(url: string, userAgent?: string): Promise<string> {
    const res = await axios.get(url, {
      headers: {
        'User-Agent': userAgent,
      },
    })
    return res.data
  }
}
