import { forward } from 'coffea'

import { init } from './init'
import events from './events'
import makeCommands from './commands'

export default function irc (config, dispatch) {
  const client = init(
    config.network,
    config.nick,
    Array.isArray(config.channels) ? config.channels : [config.channels]
  )
  const commands = makeCommands(client)

  if (!config.prefix) config.prefix = '!'
  if (!config.hasOwnProperty('bot')) config.bot = true
  events(client, config, dispatch)

  return forward(commands)
}
