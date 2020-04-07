const Discord = require("discord.js");
const bot = new Discord.Client();
const { token } = require("./config.json");

bot.on("ready", () => {
  console.log("bot is gtg!");
});

bot.on("message", (msg) => {
  if (msg.content === "HELLO") msg.reply("SUH DUDE");
});

bot.login(token);
