const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client();

const cooldowns = new Discord.Collection();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const f of commandFiles) {
  const command = require(`./commands/${f}`);
  bot.commands.set(command.name, command);
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

  if (!cooldowns.has(cmd.name)) {
    cooldowns.set(cmd.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(cmd.name);
  const cooldownAmount = (cmd.cooldown || 5) * 1000;

  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return msg.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${
          cmd.name
        }\` command.`
      );
    }
  }

  timestamps.set(msg.author.id, now);
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

  try {
    bot.commands.get(cmd).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});

bot.login(token);
