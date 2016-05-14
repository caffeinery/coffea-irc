import dude from 'debug-dude'
const { log } = dude('coffea-irc:events')

import { message, command, error } from 'coffea'

import { initOnConnect } from './init'

const listenToEvent = (client, dispatch, name) =>
  client.addListener(name, (...args) =>
    dispatch({
      ...args,
      type: name
    })
  )

const listenToEvents = (client, dispatch, names) => names.map(
  (name) => listenToEvent(client, dispatch, name)
)

export default function events (client, config, dispatch) {
  client.connect(() => {
    initOnConnect(client, config)
    dispatch({ type: 'connect' })
  })

  client.addListener('message', (from, to, text) => dispatch(message(
    to, // channel
    text, // text
    { from } // additional data
  )))

  client.addListener('message', (from, to, text) => {
    log('message event received: %o', { from, to, text })
    if (text.charAt(0) === config.prefix) { // example: .nw name
      log(' `-> command detected')
      let args = text.substring(1).split(' ') // [ 'nw', 'name' ]
      let cmd = args.shift() // nw
      // args is now [ 'name' ]
      return dispatch(command(
        to, // channel
        cmd, // cmd
        args, // args
        { from } // additional data
      ))
    }
  })

  client.addListener('error', (err) => dispatch(error(err)))

  listenToEvents(client, dispatch, [
    'registered', 'motd', 'names', 'topic', 'join', 'part', 'quit', 'kick',
    'kill', 'selfMessage', 'notice', 'ping', 'pm', 'ctcp', 'ctcp-notice',
    'ctcp-privmsg', 'ctcp-version', 'nick', 'invite', '+mode', '-mode',
    'whois', 'channellist_start', 'channellist_item', 'channellist', 'raw',
    'action'
  ])
}
