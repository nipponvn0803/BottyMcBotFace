const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  const prefix = '!';
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

    if (!message.guild) return;

    if (command === 'play') {
      const ytdl = require('ytdl-core');
      const streamOptions = { seek: 0, volume: 1 };
      const broadcast = client.createVoiceBroadcast();
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            var search = require('youtube-search');
            var opts = {
              maxResults: 1,
              key: 'AIzaSyDooKksjdaQo4RheiCD1JE-_b36voE8060'
            };
            var ytlink;
            var searchPhrase = args.join();
            search(searchPhrase, opts, function(err, results) {
              if(err) return console.log(err);
              
              console.dir(results[0].link);
              ytlink = results[0].link;
              const stream = ytdl(ytlink, { filter : 'audioonly' });
              broadcast.playStream(stream);
              const dispatcher = connection.playBroadcast(broadcast);
              message.reply('I am playing ' + ytlink);
            });
          })
          .catch(console.log);
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
    else if (command === 'pause'){
      if (message.member.voiceChannel) {
        message.member.voiceChannel.connection.dispatcher.pause()
        message.reply('Pausing');
        console.log;
      } else {
        message.reply('You need to join my voice channel first!');
      }
    }
    else if (command === 'resume'){
      if (message.member.voiceChannel) {
        message.member.voiceChannel.connection.dispatcher.resume()
        message.reply('Resuming');
        console.log;
      } else {
        message.reply('You need to join my voice channel first!');
      }
    }
    else if (command === 'disconnect'){
      if (message.member.voiceChannel) {
        message.member.voiceChannel.leave();
        message.reply('I have successfully disconnected from the channel!');
        console.log;
      } else {
        message.reply('You need to join my voice channel first!');
      }
    }

    else if (command=='drop'){
      var myArray = ['Tilted Tower', 'Risky Reel', 'Retail Row', 'Lucky Landing', 'Fatal Field', 'Greasy Grove', 'Paradise', 'Lazy Link', 'Lonely Lodge', 'Haunted Hill', 'Junk Junction', 'Pleasent Park', 'Walling Wood', 'Salty Spring', 'Loot Lake', 'Snobby Shore', 'Vikings', 'Shifty Shafts', 'Flush Factory'];    
      var rand = myArray[Math.floor(Math.random() * myArray.length)];
      message.channel.send('Xuống ' + rand + ' cho bố!!!');
    }
  
});

client.login('token');
