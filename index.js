const tmi = require('tmi.js'); // twitch irc library
var robot = require("robotjs"); // to manipulate the computer
const say = require("say"); // so you can say dumb stuff at me

const DOWN = "down";
const UP = "up";

const client = new tmi.Client({
	channels: [ 'channel-name-here' ] //
});
client.connect();

console.log("listening to chat") /// just a headsup message so you know it's gotten at least this far
console.log("listening to chat")
console.log("listening to chat")
say.speak("listening to chat");

// you can think of this as like, the main of the function, it's the handler that is listening
// to all messages sent to the channel, so this is where all the logic needs to live
client.on('message', async (channel, tags, message, self) => {
  // this shit's out the commands into your console, useful for logging and for showing the audience if you wanna
  controlsProcessor(tags, message.toLocaleLowerCase());
});

client.on("disconnected", async () => {
  console.log("LALALA IM NOT LISTENING ANYMORE")
  console.log("LALALA IM NOT LISTENING ANYMORE")
  console.log("LALALA IM NOT LISTENING ANYMORE")
});

const processMessage = (tags, message) => {
  if (message === "") return true;
  if (`${tags['display-name']}` === "Streamlabs") return true;
  if (message.includes("!")) return true;
}

const numpad = {
  1: ["a","d"],
  2: ["d"],
  3: ["s","d"],
  4: ["a"],
  6: ["d"],
  7: ["space", "a"],
  8: ["space"],
  9: ["space", "d"],
  "run": ["k"],
}

const controlsProcessor = (tags, mes) => {
  const message = mes.toLowerCase();

  if(processMessage(tags, message)) return;

  let sentence = "";
  let dash = message.includes("run");
  if (dash) {
    sentence = sentence + " oh we running"
  }

  if(message.includes("block") || message.includes("b")) return block

  if(message.includes("1")) {
    sentence = sentence + " downback"
    makeMove(1, dash, message);
  }
  if(message.includes("2")) {
    sentence = sentence + " crouch"
    makeMove(2, dash, message);
  }
  if(message.includes("3")) {
    sentence = sentence + " downforward"
    makeMove(3, dash, message);
  }
  if(message.includes("4")) {
    sentence = sentence + " back"
    makeMove(4, dash, message);
  }
  if(message.includes("5")) {
    sentence = sentence + " nothing you input nothing you moron"
  }
  if(message.includes("6")) {
    sentence = sentence + " forward"
    makeMove(6, dash, message);
  }
  if(message.includes("7")) {
    sentence = sentence + " jump back"
    makeMove(7, dash, message);
  }
  if(message.includes("8")) {
    sentence = sentence + " jump"
    makeMove(8, dash, message);
  }
  if(message.includes("9")) {
    sentence = sentence + " jump forward"
    makeMove(9, dash, message);
  }

  say.speak(sentence);
}

const makeMove = (num, dash = false, message) => {
  numpad[num].forEach(element => {
    robot.keyToggle(element, DOWN)
    if(dash) {
      robot.keyTap("k");
    }
    processAttack(message);
    robot.keyToggle(element, UP)
  });
}

const processAttack = (message) => {
  if(message.includes("punch") || message.includes("p")) {
    robot.keyTap("j")
  }
  if(message.includes("dust") || message.includes("d")) {
    robot.keyTap("l")
  }
  if(message.includes("kick") || message.includes("k")) {
    robot.keyTap("u")
  }
  if(message.includes("slash") || message.includes("s")) {
    robot.keyTap("i")
  }
  if(message.includes("heavy slash") || message.includes("h")) {
    robot.keyTap("o")
  }
  if(message.includes("dust") || message.includes("d")) {
    robot.keyTap("l")
  }
  if(message.includes("resepct") || message.includes("t")) {
    robot.keyTap("e")
  }
}

const block = () => {
  say.speak("oh we blocking now");
  robot.keyToggle("s", DOWN);
  robot.keyToggle("a", DOWN);
  const keytime = setTimeout(() => {
    robot.keyToggle("s", UP);
    robot.keyToggle("a", UP);
  }, 2000);
}
