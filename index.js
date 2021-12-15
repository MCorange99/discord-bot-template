const Client = require('./src/structures/Client');
// Create a new client instance
const client = new Client();

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(client.config.bot.token);
