module.exports = {
  name: 'clear',
  description: 'clears user comment and comments -1 of # given',
  execute(msg, args) {
    if (!args.length) return msg.reply('ERROR! `clear` requires a second numerical parameter');
    if (args[0] < 1 || args[0] > 100) return msg.reply('ERROR! numerical parameter must be within range 1-100');
    msg.channel.bulkDelete(args[0]);
  },
};
