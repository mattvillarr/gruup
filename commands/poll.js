const Discord = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'lets users vote y/n, or on specific emotes',
  cooldown: 10, // 10 second cooldown

  async execute(msg, args) {
    const e = new Discord.MessageEmbed()
      .setColor(0xffc300)
      .setTitle('Initiate poll')
      .setDescription('Use `gr poll` to initiate simple poll');

    if (!args[0]) {
      msg.channel.send(e);
    }

    // EVENTUAL LAYOUT of command: gr poll -n [# of options] -e [emojis] [option1 ... option n] poll-question
    // -e : emojis to use (# should match options)
    //TODO: function to parse rest of args
    const pollQ = args.slice().join(' ');

    const p = new Discord.MessageEmbed()
      .setColor(0xffc300)
      .setTitle(`📋 ${msg.author.username} started a poll`)
      .setDescription(`\`${pollQ}\``);

    //TODO: Method to get array of react emojis for (might be same as args funct)
    let startPoll = await msg.channel.send(p);
    await startPoll.react('✅');
    await startPoll.react('❎');

    const filter = (reaction) => reaction.emoji.name === '✅' || reaction.emoji.name === '❎';
    let res = await startPoll.awaitReactions(filter, { time: 15000 }).catch(console.error);

    let resEmbed = new Discord.MessageEmbed()
      .setColor(0x27db5d)
      .setTitle(`Poll Complete!`)
      .setDescription(`Results For The Poll \`${pollQ}\``);

    console.log(res);
    let winner = { icon: '😱 no one voted...', count: '0' };

    for (let r of res) {
      
      if (r[1].count >= winner.count && r[1].count - 1 != 0) {
        resEmbed.addField(r[0], `Votes: ${r[1].count - 1}`);
        winner.icon = r[0];
        winner.count = r[1].count;
      }
    }
    resEmbed.addField(`The winner is`, `${winner.icon}  !!`);
    // console.info(res);
    // let resEmbed = new Discord.MessageEmbed()
    //   .setColor(0xffc300)
    //   .setTitle(`Poll Complete!`)
    //   .setDescription(`Results For the Poll \`${pollQ}\``)
    //   .addField('✅', `Votes: ${res.get('✅').count - 1}`)
    //   .addField('❎', `Votes: ${res.get('❎').count - 1}`)
    //   .addField(`The winner is`, `${winner.icon} !!`);

    msg.channel.send(resEmbed);
  },
};
