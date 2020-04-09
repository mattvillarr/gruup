const Discord = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'lets users vote y/n, or on specific emotes',
  cooldown: 10, // 10 second cooldown
  execute(msg, args) {
    const e = new Discord.MessageEmbed()
      .setColor(0xffc300)
      .setTitle('Initiate poll')
      .setDescription('Use `gr poll` to initiate simple poll');

    if (!args[0]) {
      msg.channel.send(e);
    }

    const pollQ = args.slice().join(' ');

    msg.channel.send(`📋 ${msg.author.username} has asked: \t\`${pollQ}\``).then((reaction) => {
      reaction.react('👍');
      reaction.react('👎');
      msg.delete().catch(console.error);
    });
  },
};
