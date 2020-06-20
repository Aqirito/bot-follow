const mineflayer = require('mineflayer');
const navigatePlugin = require('mineflayer-navigate')(mineflayer);

const config = { 
host: "aqirito.aternos.me", //mc.hypixel.net for example
port: 25565, //server port (leave it as is unless you know what you're doing!)
username: "cincong", //username only for cracked/offline mode servers, email for premium
version: false //version of the server (false = auto detect)
};

const bot = mineflayer.createBot({ //creates a new bot from the config above
host: config.host, //im ported from config
port: config.version, //imported from config
username: config.username, //imported from config
version: config.version //imported from config
});

console.log("Connecting...");


// install the plugin
navigatePlugin(bot);
// optional configuration
bot.navigate.blocksToAvoid[132] = true; // avoid tripwire
bot.navigate.blocksToAvoid[59] = false; // ok to trample crops
bot.navigate.on('pathFound', function (path) {
  bot.chat("found path. I can get there in " + path.length + " moves.");
});
bot.navigate.on('cannotFind', function (closestPath) {
  bot.chat("unable to find path. getting as close as possible");
  bot.navigate.walk(closestPath);
});
bot.navigate.on('arrived', function () {
  bot.chat("I have arrived");
});
bot.navigate.on('interrupted', function() {
  bot.chat("stopping");
});
bot.on('chat', function(username, message) {
  // navigate to whoever talks
  if (username === bot.username) return;
  const target = bot.players[username].entity;
  if (message === 'come') {
    bot.navigate.to(target.position);
  } else if (message === 'stop') {
    bot.navigate.stop();
  }
});