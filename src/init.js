import irc from 'irc'

export default function init (host, nick, channels) {
  return new irc.Client(host, nick, { channels, autoConnect: false })
}
