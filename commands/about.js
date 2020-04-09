module.exports = {
	name: 'about',
	description: 'Gives user a URL to bot website',
	execute(msg, args) {
		msg.channel.send('LINK TO COOL WEBSITE HERE');
	},
}