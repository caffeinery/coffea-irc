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
