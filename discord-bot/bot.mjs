// A Discord bot with two commands, powered by the WordSoHard API:
//   !define <word>   definition, validity, and score
//   !score <word>    just validity and score

import { Client, GatewayIntentBits } from "discord.js";

const API = "https://wordsohard.com/api/v1/define/";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function lookup(word) {
  const res = await fetch(API + encodeURIComponent(word));
  if (!res.ok) return null; // 400 means the input was not 2-30 letters
  return res.json();
}

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  const [cmd, word] = msg.content.trim().split(/\s+/);
  if ((cmd !== "!define" && cmd !== "!score") || !word) return;

  const d = await lookup(word);
  if (!d) return msg.reply("Send a word of 2-30 letters.");

  const name = d.word.toUpperCase();
  if (!d.scrabble.valid) return msg.reply(`${name} is not a valid play.`);

  const score = `${name} is valid for ${d.scrabble.score} points${d.scrabble.bingo ? " (bingo!)" : ""}.`;
  if (cmd === "!score") return msg.reply(score);

  const meaning = d.definitions[0]?.definition ?? "No definition yet.";
  // Keep the attribution line: it is the one condition of using the API.
  msg.reply(`${score}\n${meaning}\n-# ${d.attribution}`);
});

client.once("ready", () => console.log(`Logged in as ${client.user.tag}`));
client.login(process.env.DISCORD_TOKEN);
