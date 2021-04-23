import { userAgents } from '../constants'

export class userAgentHelper {
  static getRandom(): string {
    const randomIndex = Math.floor(Math.random() * userAgents.length)
    return userAgents[randomIndex].ua
  }
}
