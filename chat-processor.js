const tmi = require('tmi.js'); // twitch irc library
const say = require("say");

const client = new tmi.Client({
	channels: [ 'pgl_dota2' ] // fuckin, your channel or whatever, it says cookie cos i'm cookie innit.
});
client.connect();

client.on('message', async (channel, tags, message, self) => {
  console.log(`${tags['display-name']}: ${message}`)
  if (message.toLocaleLowerCase().includes("he")) {
    say.speak(message); //tts
  }
});

/**
 * This is func wibble.
 *
 * @param {int} parble - A string param
 */
const wibble = (parble) => {
  return parble.toLocaleLowerCase();
}

