'use strict';
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
const credentials = require('../credentials.json');
const utils = require('../js/utils.js');

bot.login(credentials.token);

bot.on('ready', () => {
    // bot.user.setUsername('Emoji Microwave (Temporary Name)')
    console.log('Awaiting D-mails!');
    bot.user.setPresence({ game: { name: 'with worldlines' }, status: 'online' });
});

bot.on('message', (message) => {

    // No-op if message was from a bot
    if(message.author.bot) return;

    // String literal matches
    if(message.content.toLowerCase() === 'nullpo') {
        message.channel.send('Gah!');
    }

    // Commands
    if(message.content.startsWith(config.commandPrefix)) {
        const command = utils.parseCommand(message.content);
        switch (command.toLowerCase()) {
            case 'help':
                helpCommand(message);
                break;
            case 'tuturu':
                playCommand(message, command);
                break;
            case 'beechga':
                playCommand(message, command);
                break;
            case 'sonuvabetch':
                playCommand(message, command);
                break;
        }
    }

    // Emojis
    if(message.content.includes(':')) {
        emojiCommand(message);
    }
});

function helpCommand (message) {
    const emojiEntries = Object.entries(config.emojis).map(([emoji, entry]) => `${config.emojiPrefix}${emoji}\n\t- ${entry.description}`);
    const commandEntries = Object.entries(config.commands).map(([command, entry]) => `${config.commandPrefix}${command} ${entry.usage}\n\t- ${entry.description}`);
    const helpText =
`I-It's not like I want you to know how I work or anything, **b-b-baka**!
_Emojis:_
${emojiEntries.join('\n')}
_Commands:_
${commandEntries.join('\n')}`;

    message.channel.send(helpText);
}

function playCommand (message, commandName) {
    const targetChannel = message.member.voiceChannel;
    if(!targetChannel) message.channel.send(config.commands[commandName].description);
    else {
        utils.playAudioFile(targetChannel, commandName)
    }
}

function emojiCommand (message) {
    const emojiPrefix = config.emojiPrefix;
    
    let match;
    if(match = message.content.match(`${emojiPrefix}([^\\s]*)`)) {
        const [, emoji] = match;
        if(config.emojis[emoji]) {
            message.channel.send('', {
                file: `${config.emojis[emoji].filePath}`
           });
        }
    }
}