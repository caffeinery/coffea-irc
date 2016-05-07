# coffea-irc

_irc plugin for [coffea 1.0-beta](https://github.com/caffeinery/coffea/tree/1.0-beta)_


## Setup

 * Make sure to use the latest *beta* version of coffea by running: `npm install --save coffea@beta`
 * Install `coffea-irc`: `npm install coffea-irc`


## Usage

Specify the telegram protocol in your network config:

```js
{
  "protocol": "irc",
  "network": "chat.freenode.net", // required
  "nick": "coffeabot1337", // required
  "channels": [ "#caffeinery" ], // optional
  "prefix": "." // optional, default: !
}
```

coffea will automatically load `coffea-irc` when it's needed! Thus, using irc (or other protocols) this way should work on **any** coffea project, **without any tweaks** (other than installing `coffea-irc` and specifying the config).

`coffea-irc` aims to be compatible with coffea. Of course, features that irc doesn't have (like audio messages) aren't available for irc protocols, they will just
be ignored.


## API

Joining/parting channels:

```js
networks.send({
  type: 'join',
  channel: '#caffeinery',
  password: 'optional password for the channel'
})

networks.send({
  type: 'part',
  channel: '#caffeinery'
})
```

Sending irc commands:

```js
networks.send({
  type: 'send',
  args: [ 'MODE', '#caffeinery', '+v', 'coffeabot1337' ]
})
```


## Special events

You can find a list of all events in the [`node-irc` documentation](http://node-irc.readthedocs.io/en/latest/API.html#events).

All events listed there are forwarded to coffea, arguments to the function become part of the `evt` object, e.g.:

```js
networks.on('motd', (evt) => {
  console.log('motd received: ', evt.motd)
})
```


## Colors / Formatting

Not supported by coffea yet, so use [irc-colors](https://www.npmjs.com/package/irc-colors) for now:

```js
import { blue } from 'irc-colors'

networks.on('message', (msg, reply) => reply(message(msg.channel,
  blue("blue text")
)))
```
