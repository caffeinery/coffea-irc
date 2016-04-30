import dude from 'debug-dude'
const { log } = dude('coffea-irc:events')

import { message, command, error } from 'coffea'

export default function events (client, config, dispatch) {
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
}
