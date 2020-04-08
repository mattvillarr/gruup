const Discord = require("discord.js");
const bot = new Discord.Client();
const { token } = require("./config.json");

const PREFIX = "!";

bot.on('ready', () => {
  console.log("bot is gtg!");
});

bot.on('message', (msg) => {
  let args = msg.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case 'help':
      msg.channel.send('SUH DUDE');
      break;

    case 'about':
      msg.channel.send('LINK TO COOL WEBSITE HERE');
      break;
      
    case 'clear':
        if(!args[1]) return msg.reply('ERROR! `clear` requires a second numerical parameter');
        msg.channel.bulkDelete(args[1]);
        break;
  }
});

bot.login(token);
