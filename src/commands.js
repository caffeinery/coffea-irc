export default function makeCommands (client) {
  return {
    // TODO: standardize these commands and document in coffea
    //       e.g. message(...), me(), photo(...), ...
    'message': (event) =>
      client.say(event.chat, event.text),
    'send': (event) =>
      client.send(...event.args),
    'join': (event) =>
      client.join(event.chat + (event.password ? ' ' + event.password : '')),
    'part': (event) =>
      client.part(event.chat)
  }
}
