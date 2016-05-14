import dude from 'debug-dude'
const { info } = dude('coffea-irc:init')

import irc from 'irc'

export function init (host, nick, channels) {
  info('connecting %s to %s', host, nick)
  info(' `-> joining channels: %o`', channels)
  return new irc.Client(host, nick, { channels, autoConnect: false })
}

export const initOnConnect = (client, config) => {
  if (config.bot) {
    info(' `-> connecting as bot (umode +B)')
    client.send('MODE', config.nick, '+B')
  }
}
