const Discord = require('discord.js');

module.exports = {
  name: 'me',
  description: 'Gives user profile',
  execute(msg, args) {
    if (!args[0]) {
      let embed = new Discord.MessageEmbed()
        .setTitle('User Information')
        .setColor(0x34eb92)
        .setThumbnail(msg.author.displayAvatarURL({ format: 'png', dynamic: true }))
        .addField('Player name', msg.author.username, true)
        .addField('Tag', msg.author.discriminator, true)
        .addField('Is in', msg.guild.name);
      msg.channel.send(embed);
    } else {
        // console.log(msg);
        // let user = msg.Client.users.get(user => user.username == args[0]);
        // let embed = new Discord.MessageEmbed()
        // .setTitle('User Information')
        // .setColor(0x34eb92)
        // .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
        // .addField('Player name', user.username, true)
        // .addField('Tag', uesr.tag, true)
        // .addField('Is in', user.guild.name);
        // msg.channel.send(embed);
    }
  },
};
