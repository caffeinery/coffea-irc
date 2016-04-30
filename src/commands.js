export default function makeCommands (client) {
  return {
    // TODO: standardize these commands and document in coffea
    //       e.g. message(...), me(), photo(...), ...
    'message': (event) =>
      client.say(event.channel, event.text),
    'send': (event) =>
      client.send(...event.args),
    'join': (event) =>
      client.join(event.channel + (event.password ? ' ' + event.password : '')),
    'part': (event) =>
      client.part(event.channel)
  }
}
