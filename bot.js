const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const f of commandFiles) {
  const cmd = require(`./commands/${f}`);
  bot.commands.set(cmd.name, cmd);
}

bot.on('ready', () => {
  console.log('gruup is gtg!');
});

bot.on('message', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  let args = msg.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  console.log('cmd: ', cmd, '\nargs: ', args);

  if (!bot.commands.has(cmd)) return;

  try {
    bot.commands.get(cmd).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});

bot.login(token);
