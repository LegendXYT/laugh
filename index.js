require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Routes,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  ActivityType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Collector,
  SlashCommandBuilder,
  Guild,
  AttachmentBuilder,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const fs = require('fs');
const path = require('path');
const { timeStamp } = require("console");

const TOKEN = process.env.TOKEN;
const botID = process.env.BOT_ID;
const guildID = process.env.SERVER_ID;
const devID = process.env.DEV_ID;
const realBotPrefix = '!';

const rest = new REST({ version: "10" }).setToken(TOKEN);

const { difficulty03001, difficulty03000 } = require("./information/difficulty.js");
const { gif03001, gif03000 } = require("./information/gif.js");
const { notes03001, notes03000 } = require("./information/notes.js");
const { thumb03001, thumb03000} = require(`./information/thumbnail.js`);
const { rating03001, rating03000 } = require("./information/rating.js");

const { kayoKnifeIcon, kayoFlashIcon, kayoMollyIcon,
  viperMollyIcon, viperOrbIcon, viperUltIcon, viperWallIcon, viperIcon} = require(`./information/icons.js`);

  const {
    video02000, video02001, video02002, video02003, video02004, video02005, video02006,video02007,video02008,video02009,
    video02010, video02011, video02012, video02013, video02014, video02015,video02016,video02017,video02018,video02019,
    video02020, video02021, video02022, video02023,video02024,video02025,video02026,video02027,video02028,video02029,
    video02030,video02031,video02032,video02033,video02034,video02035,

    video03000, video03001
  } = require(`./information/video.js`);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

/* 
=====================
Ready statement:
bot going online
bot presence messages
=====================
*/

client.on("ready", async (c) => {
  console.log(`
    ${c.user.tag} is online!
    Working on ${client.guilds.cache.size} servers!
    Working with ${client.users.cache.size} users!
    `);

  let statuses = [
    {
      name: `${realBotPrefix}help`,
      type: ActivityType.Playing,
    },
    {
      name: "Lineup Tutorials",
      type: ActivityType.Watching,
    },
    {
      name: `${client.guilds.cache.size} servers`,
      type: ActivityType.Competing,
    },
    {
      name: `${client.users.cache.size} users`,
      type: ActivityType.Listening,
    },
  ];

  setInterval(() => {
    let random = Math.floor(Math.random() * statuses.length);
    client.user.setActivity(statuses[random]);
  }, 15000); // time delay between each status (15s)

  // client.user.setStatus('dnd')
});

client.on("guildCreate", guild => {

  let gcembed = new EmbedBuilder()
  .setColor("#08d32a")
  .setAuthor({name:`${guild.name}`, iconURL: guild.iconURL()})
  .addFields({name: "I joined a server!", value:`I am now in ${client.guilds.cache.size} servers.`})
  .addFields({name:"Owner", value: `<@${guild.ownerId}>`, inline: true})
  .addFields({name:"Member Count", value:`${guild.memberCount}`, inline: true})
  .setTimestamp()
  client.channels.cache.get("1089139123874439228").send({embeds: [gcembed]});

});

client.on("guildDelete", guild => {

  let gdembed = new EmbedBuilder()
  .setColor("#f70404")
  .setAuthor({name:`${guild.name}`, iconURL: guild.iconURL()})
  .addFields({name: "I Left a server!", value: `I am now in ${client.guilds.cache.size} servers.`})
  .addFields({name: "Owner", value: `<@${guild.ownerId}>`, inline: true})
  .addFields({name:"Member Count", value:`${guild.memberCount} members`, inline: true})
  .setTimestamp()
  client.channels.cache.get("1089139123874439228").send({embeds: [gdembed]});
});

client.on("messageCreate", async (message) => {
  let prefix = await db.get(`prefix_${message.guild.id}`)
  if(prefix === null ) prefix = realBotPrefix;
  const prefixDisplay = prefix;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLocaleLowerCase();

  //message array

  const messageArray = message.content.split(" ");
  const argumentt = messageArray.slice(1);
  const cmd = messageArray[0];

  // colours
  const blueColour = '#5658ff'; // sova
  const lightBlueColour = '#9adeff'; // jett
  const darkBlueColour = '#315bb9'; // omen
  const greenColour = '#078f3f'; // viper
  const silverColour = '#9E9E9E'; // Cypher
  const cyanColour = '#05c4bc'; // sage
  const yellowColour = '#ffe100'; // killjoy
  const greyColour = '#1e1f31'; // fade
  const orangeColour = '#ff6700'; //brimstone & raze
  const redColour = '#dc3d4b'; // Phoenix
  const limeGreenColour = '#CCED00'; // Gekko
  

  const sovaColour = blueColour;
  const jettColour = lightBlueColour;
  const omenColour = darkBlueColour;
  const viperColour = greenColour;
  const cypherColour = silverColour;
  const sageColour = cyanColour;
  const killjoyColour = yellowColour;
  const fadeColour = greyColour;
  const brimstoneColour = orangeColour;
  const razeColour = orangeColour;
  const phoenixColour = redColour;
  const gekkoColour = limeGreenColour;
  const kayoColour = blueColour;


  /*
============
  Commands
============
*/
switch(command) {
  //help
  case 'help':
// main help embed
  let helpEmbed = new EmbedBuilder()
  .setColor(lightBlueColour)
  .setAuthor({name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
  .setDescription(`these are the avaliable commands for ${client.user.username}\nThe bot prefix is: ${prefixDisplay}\n**Do** ${prefixDisplay}help [Command] **- for further information**`)
  .addFields({name: ":gear: Utility", value: "> Util commands", inline: true})
  .addFields({name: ":tools: Admin", value: "> Admin commands", inline: true})
  .addFields({name: ":nerd: Lineups", value: "> lineups Commands"})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
// sub help embed
  let helpUtilEmbed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('Util Commands')
  .setDescription(`**Do** ${prefixDisplay}help [Command] **- for further information**`)
  .addFields({name: `${prefixDisplay}help`, value: `do ${prefixDisplay}help for list of commands`})
  .addFields({name: `${prefixDisplay}ping`, value: `do ${prefixDisplay}ping to get the bots ping`})
  .addFields({name: `${prefixDisplay}uptime`, value: `do ${prefixDisplay}uptime to see the bots uptime`})
  .addFields({name: `${prefixDisplay}invite`, value: `do ${prefixDisplay}invite to invite the bot to your server`})
  .setTimestamp()

  let helpAdminEmbed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('Administrator Commands')
  .setDescription(`**Do** ${prefixDisplay}help [Command] **- for further information**`)
  .addFields({name: `${prefixDisplay}setprefix`, value: `do ${prefixDisplay}setprefix to change the bots prefix`})
  .addFields({name: `${prefixDisplay}defaultprefix`, value: `do ${prefixDisplay}defaultprefix to see the prefix back to default`})
  .setTimestamp()

  let helpLineupEmbed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('Lineup Commands')
  .setDescription(`**Do** ${prefixDisplay}help [Command] **- for further information**`)
  .addFields({name: `${prefixDisplay}video [Lineup ID]`, value: `to view a mp4 file of a lineup`, inline: true})
  .addFields({name: `${prefixDisplay}lineup [Lineup ID]`, value: `to quick search a lineup`, inline: true})
  .addFields({name: `${prefixDisplay}kayo ascent`, value: `to view the Kayo lineups for Ascent`, inline: true})
  .addFields({name: `${prefixDisplay}viper icebox`, value: `to view the Viper lineups for Icebox`, inline: true})

  .setTimestamp()
// embed buttons
  const button = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setCustomId(`home`)
    .setLabel(`🏠 | Home`)
    .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
    .setCustomId(`util`)
    .setLabel(`⚙️ | utility `)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`admin`)
    .setLabel(`🛠️ | Admin`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`lineups`)
    .setLabel(`🤓 | Lineups`)
    .setStyle(ButtonStyle.Success),

  )
  // changing the embed when button is pressed
if(!args[0]){
  await message.channel.send({embeds: [helpEmbed], components: [button]}).then(async (msg) => {
   let collector = await msg.createMessageComponentCollector();
    collector.on('collect', async (i) => {
      if(i.customId === 'home'){
        await i.update({embeds: [helpEmbed], components: [button]})
      }
      else if(i.customId === 'util'){
        await i.update({embeds: [helpUtilEmbed], components: [button]})
      } else if(i.customId === 'admin'){
        await i.update({embeds: [helpAdminEmbed], components: [button]})
      } else if(i.customId === 'lineups'){
        await i.update({embeds: [helpLineupEmbed], components: [button]})
      }
     })
  })
}

// further informaton commands 

  if(args[0] === 'ping'){
    // help ping
  let pingEmbed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('Command: ping')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}ping`, inline: true})
  .addFields({name: `description:`, value: `See the bots ping: latency and api latency`,inline: true})
  .addFields({name: `Accessiblity:`, value: `Everyone`,inline: false})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [pingEmbed]});
  } else if(args[0] === 'help'){
    //help help
    let helpEmbedExtended = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('Command: help')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}help\n${prefixDisplay}help [command]\n**e.g: ${prefixDisplay}help ping**`, inline: true})
  .addFields({name: `description:`, value: `See all the bots commands, and details about them`,inline: true})
  .addFields({name: `Accessiblity:`, value: `Everyone`,inline: false})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [helpEmbedExtended]});

  } else if(args[0] === 'uptime'){
    //help uptime
    let uptimeEmbed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('uptime')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}uptime`, inline: true})
  .addFields({name: `description:`, value: `see how long the bot has been online for`,inline: true})
  .addFields({name: `Accessiblity:`, value: `Everyone`,inline: false})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [uptimeEmbed]});
  } else if(args[0] === 'setprefix'){
    // help set prefix
    let setPrefixEmbedExteneded = new EmbedBuilder()
  .setColor(orangeColour)
  .setTitle('setprefix')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}setprefix [prefix]\n**e.g: ${prefixDisplay}setprefix &&**`, inline: true})
  .addFields({name: `description:`, value: `Change the bots prefix to your custom liking`,inline: true})
  .addFields({name: `Accessiblity:`, value: `Administrator`,inline: false})
  .addFields({name: `Aliases`, value: `${prefixDisplay}set-prefix`, inline: true})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [setPrefixEmbedExteneded]});
  } else if(args[0] === 'defaultprefix'){
    // help default prefix
    let defaultPrefixEmbedExtended = new EmbedBuilder()
  .setColor(orangeColour)
  .setTitle('setprefix')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}defaultprefix`, inline: true})
  .addFields({name: `description:`, value: `Change the bots prefix to default`,inline: true})
  .addFields({name: `Accessiblity:`, value: `Administrator`,inline: false})
  .addFields({name: `Aliases`, value: `${prefixDisplay}default-prefix`, inline: true})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [defaultPrefixEmbedExtended]});
  }else if(args[0] === 'video'){
    // help video
    let vidEmebed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('video')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}video [Lineup_ID]\ne.g: ${prefixDisplay}video 02005`, inline: true})
  .addFields({name: `description:`, value: `view a mp4 video of a lineup`,inline: true})
  .addFields({name: `Accessiblity:`, value: `everyone`,inline: false})
  .addFields({name: `Aliases`, value: `${prefixDisplay}vid`, inline: true})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [vidEmebed]});
  } else if(args[0] === 'lineup'){
    // help lineup
    let lineupEmbed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('lineup')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}lineup [Lineup_ID]\ne.g: ${prefixDisplay}lineup 02005`, inline: true})
  .addFields({name: `description:`, value: `quick search a lineup by id`,inline: true})
  .addFields({name: `Accessiblity:`, value: `everyone`,inline: false})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [lineupEmbed]});
  }else if(args[0] === 'kayo' && args[1] === 'ascent'){
    // help kayo ascent
    let kayoAscentEmbed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('Kayo Ascent')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}kayo ascent`, inline: true})
  .addFields({name: `description:`, value: `view all the kayo lineups for ascent`,inline: true})
  .addFields({name: `Accessiblity:`, value: `everyone`,inline: false})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [kayoAscentEmbed]});
  }else if(args[0] === 'invite'){
    //help invite
    let inviteEmbed = new EmbedBuilder()
  .setColor(greenColour)
  .setTitle('Invite')
  .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
  .setThumbnail(message.guild.iconURL())
  .setDescription(`The bot prefix is ${prefixDisplay}`)
  .addFields({name: `Useage:`, value: `${prefixDisplay}invite`, inline: true})
  .addFields({name: `description:`, value: `invite the bot to your server`,inline: true})
  .addFields({name: `Accessiblity:`, value: `Everyone`,inline: false})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
  .setTimestamp()
  message.channel.send({embeds: [inviteEmbed]});
  } else if(args[0] === 'viper' && args[1] === 'icebox'){
     // help viper icebox
     let viperIceboxEmbed = new EmbedBuilder()
     .setColor(greenColour)
     .setTitle('Viper Icebox')
     .setAuthor({name:`${client.user.username} help!`, iconURL: client.user.displayAvatarURL()})
     .setThumbnail(message.guild.iconURL())
     .setDescription(`The bot prefix is ${prefixDisplay}`)
     .addFields({name: `Useage:`, value: `${prefixDisplay}viper icebox`, inline: true})
     .addFields({name: `description:`, value: `view all the Viper lineups for Icebox`,inline: true})
     .addFields({name: `Accessiblity:`, value: `everyone`,inline: false})
     .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})
     .setTimestamp()
     message.channel.send({embeds: [viperIceboxEmbed]});
  }




break;

  // ping
  case 'ping':
    // let botLatency = Math.floor(message.createdTimestamp - new Date().getTime());
    message.channel.send('Calculating ping...').then(resultMessage => {
      const botLatency = resultMessage.createdTimestamp - message.createdTimestamp
      let apiLatency = Math.round(client.ws.ping);
      resultMessage.edit(
        `Pong! :ping_pong:\nLatency: ` +
          "`" +
          `${botLatency}ms` +
          "`" +
          `\nAPI Latency: is ` +
          "`" +
          `${apiLatency}ms` +
          "`"
      );
    })
    
    break;

    // uptime
    case 'uptime':
      function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()

        if(day.padStart(1, '0') === '0' && hrs.padStart(2,'0') === '00' && min.padStart(2,'0') === '00'){
          return `**${sec.padStart(2, '0')}** seconds`
        } else if(day.padStart(1, '0') === '0' && hrs.padStart(2,'0') === '00'){
          return `**${min.padStart(2, '0')}** minutes, **${sec.padStart(2, '0')}** seconds`
        } else if(day.padStart(1, '0') === '0' ){
          return `**${hrs.padStart(2, '0')}** hours, **${min.padStart(2, '0')}** minutes, **${sec.padStart(2, '0')}** seconds`
        } else {
        return `**${day.padStart(1, '0')}** days, **${hrs.padStart(2, '0')}** hours, **${min.padStart(2, '0')}** minutes, **${sec.padStart(2, '0')}** seconds`
        }
      }
    
    
      message.channel.send(`I have been on online for: ${duration(client.uptime)}`)

      break;
      
// invite
case 'invite':
  const embed = new EmbedBuilder()
  .setColor(blueColour)
  .setAuthor({name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
  .setDescription('[Invite me to your server!](https://discord.com/api/oauth2/authorize?client_id=581317940323024899&permissions=535800840129&scope=bot%20applications.commands)')
  message.channel.send({embeds: [embed]})
  break;
    // Set Status

    case 'setstatus':
    case 'set-status':
      if (message.author.id != devID) return message.channel.send("You are not allowed to use this command!");
    if (args == "") {
      message.channel.send(
        `Make sure it is either **dnd**, **online**, **idle**, **invisible**`
      );
    } else if (args[0] === "dnd") {
      client.user.setStatus("dnd");
      message.channel.send(
        `Successfully changed the bots status to **Do Not Disturb**`
      );
    } else if (args[0] === "idle") {
      client.user.setStatus("idle");
      message.channel.send(`Successfully changed the bots status to **idle**`);
    } else if (args[0] === "online") {
      client.user.setStatus("online");
      message.channel.send(
        `Successfully changed the bots status to default -> **online**`
      );
    } else if (args[0] === "invisible" || "offline") {
      client.user.setStatus("invisible");
      message.channel.send(
        `Successfully changed the bots status to **invisible**`
      );
    }
    break;
// set prefix
    case 'setprefix':
    case 'set-prefix':
      if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("You do not have permission to execute this command!");

      const prefix = args[0];
      const newPrefix = await db.set(`prefix_${message.guild.id}`, prefix)

      let setPrefixEmbed = new EmbedBuilder()
      .setColor(blueColour)
      .setDescription(`:white_check_mark:  Your prefix has been changed to **${newPrefix}**`)

      message.channel.send({embeds: [setPrefixEmbed]});
    break;
// set to default prefix
    case 'defaultprefix':
    case 'default-prefix':
      
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send("You do not have permission to execute this command!");
      
    const DefaultPrefix = realBotPrefix;
      let defaultPrefixEmbed = new EmbedBuilder()

      .setColor(blueColour)
      .setDescription(`:white_check_mark:  Your prefix has been changed to **${DefaultPrefix}**`)
      
      await db.set(`prefix_${message.guild.id}`, DefaultPrefix);
      message.channel.send({embeds: [defaultPrefixEmbed]});
      break;


      // lineups 
                // Kayo
      case 'kayo':
        // Map: ASCENT
        if(args[0] === 'ascent'){
let kayoAscentHelp = new EmbedBuilder()
  .setColor(kayoColour)
  .setAuthor({name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
  .setTitle(`Kayo Lineups Ascent`)
  .addFields({name: "Defending", value: "> Knife information\n> Defence Flash", inline: true})
  .addFields({name: "Attacking", value: "> Knife information\n> Molly Executes\n> Flash Executes", inline: true})
  .addFields({name: "Post Plant", value: "> Post Plant Flashes", inline: true})
  .addFields({name: "Other", value: "> Other handy lineups", inline: true})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})

let kayoAttackLineups = new EmbedBuilder()
          .setColor(kayoColour)
          .setTitle(`Kayo Ascent Attack Lineups`)
          .addFields({name: "Knife Lineups A site", value: `${prefixDisplay}kayo ascent knife wine\n${prefixDisplay}kayo ascent knife close site\n${prefixDisplay}kayo ascent knife a site`, inline: true})
          .addFields({name: "Knife Lineups Mid", value: `${prefixDisplay}kayo ascent knife market`, inline: true})
          .addFields({name: "Knife Lineups B site", value: `${prefixDisplay}kayo ascent knife logs\n${prefixDisplay}kayo ascent knife switch`, inline: true})
          .addFields({name: "Flash Lineups A site", value: `${prefixDisplay}kayo ascent flash a site\n${prefixDisplay}kayo ascent flash generator\n${prefixDisplay}kayo ascent flash tree\n${prefixDisplay}kayo ascent flash a main attack`, inline: true})
          // .addFields({name: "Flash Lineups B site", value: `Switch`, inline: true})
          .addFields({name: "Molly Lineups A site", value: `${prefixDisplay}kayo ascent molly heaven\n${prefixDisplay}kayo ascent molly dice\n${prefixDisplay}kayo ascent molly generator\n${prefixDisplay}kayo ascent molly tree`, inline: true})
          .addFields({name: "Knife Lineups B site", value: `${prefixDisplay}kayo ascent molly stairs\n${prefixDisplay}kayo ascent molly ct`, inline: true})
          .setTimestamp()

          let kayoDefenceLineups = new EmbedBuilder()
          .setColor(kayoColour)
          .setTitle(`Kayo Ascent Defence Lineups`)
          .addFields({name: "Knife Lineups", value: `${prefixDisplay}kayo ascent knife a main\n${prefixDisplay}kayo ascent knife b main`, inline: true})
          .addFields({name: "Flash Lineups", value: `
          ${prefixDisplay}kayo ascent flash b main\n${prefixDisplay}kayo ascent flash tiles\n${prefixDisplay}kayo ascent flash stairs\n${prefixDisplay}kayo ascent flash lane\n${prefixDisplay}kayo ascent flash a main defence\n${prefixDisplay}kayo ascent flash mid
          `, inline: true})
          .setTimestamp()

          let kayoPostPlantLineups = new EmbedBuilder()
          .setColor(kayoColour)
          .setTitle(`Kayo Ascent Post Plant Lineups`)
          .addFields({name: "A site Flashes", value: `${prefixDisplay}kayo ascent flash heaven`, inline: true})
          .addFields({name: "B site Flashes", value: `${prefixDisplay}kayo ascent flash anti retake`, inline: true})
          .setTimestamp()

          let kayoOtherLineups = new EmbedBuilder()
          .setColor(kayoColour)
          .setTitle(`Kayo Ascent other Lineups`)
          .addFields({name: "Destroy Retake Killjoy ult", value: `> ${prefixDisplay}kayo ascent retake Killjoy ult`, inline: true})
          .addFields({name: "Destroy Killjoy ult B Site ult", value: `> ${prefixDisplay}kayo ascent killjoy ult b site`, inline: true})
          .setTimestamp()
        
  const button = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setCustomId(`defending`)
    .setLabel(`Defending`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`attacking`)
    .setLabel(`Attacking`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`postPlant`)
    .setLabel(`Post Plant`)
    .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
    .setCustomId(`other`)
    .setLabel(`Other`)
    .setStyle(ButtonStyle.Secondary),


  )
  if(!args[1]){
    await message.channel.send({embeds: [kayoAscentHelp], components: [button]}).then(async (msg) => {
     let collector = await msg.createMessageComponentCollector();
      collector.on('collect', async (i) => {
        if(i.customId === 'defending'){
          await i.update({embeds: [kayoDefenceLineups], components: [button]})
        }
        else if(i.customId === 'attacking'){
          await i.update({embeds: [kayoAttackLineups], components: [button]})
        } else if(i.customId === 'postPlant'){
          await i.update({embeds: [kayoPostPlantLineups], components: [button]})
        } else if(i.customId === 'other'){
          await i.update({embeds: [kayoOtherLineups], components: [button]})
        }
       })
    })
  }
      /* =======
        OTHER
        ========= */
  // retake killjoy ult a site
     if(args[1] === 'retake'){
            if(args[2] === 'killjoy' || args[2] === 'kj'){
              if(args[3] === 'ult'){                 
        const embed = new EmbedBuilder()
        .setColor(kayoColour)
        .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
        .setAuthor({ name: 'Destroy killjoy retake ult A site', iconURL: kayoMollyIcon})
        .setThumbnail('https://cdn.discordapp.com/attachments/1086545559432740904/1086545669340278854/Screenshot_1061.png')
        .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
        .addFields({name: "Rating:", value: "10/10", inline: true})
        .addFields({name: "Difficulty:", value: "medium", inline: true})
        .addFields({name: "Notes:", value: `wedge yourself with the wall in hell and lineup the middle of your bottom left hud line to the white spot on generator`, inline: false})
        .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzg2MWI5NTQzZWE0NTNjMzJhYTAwOTFlNzIyODc5ZTgwMjRkYzhkMSZjdD1n/uwaEmVk021A8ffPSpc/giphy-downsized-large.gif`)
        .setTimestamp()
        .setFooter({ text: "ID: 02000", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
        message.channel.send({ embeds: [embed]})      
                  
                }
              }
            } 
            // killjoy b site ult
            if(args[1] === 'killjoy' || args[1] === 'kj'){
              if(args[2] === 'ult'){
                if(args[3] === 'b' || args[2] === 'bsite'){     
                  if(args[4] === 'site' || args[3] === 'bsite' ){        
          const embed = new EmbedBuilder()
          .setColor(kayoColour)
          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
          .setAuthor({ name: 'Destroy Killjoy ult B site', iconURL: kayoMollyIcon})
          .setThumbnail('https://cdn.discordapp.com/attachments/1086545559432740904/1086545782343221289/Screenshot_1062.png')
          // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
          .addFields({name: "Rating:", value: "4/10", inline: true})
          .addFields({name: "Difficulty:", value: "easy", inline: true})
          .addFields({name: "Notes:", value: `stand anywhere in lane and line up your crosshair to the dark line`, inline: false})
          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjA2MjZlN2U5NWJlMTRiZDljOWM1OTNkZDk1ZGZiZTk5OWI2OGYzYyZjdD1n/ZiAchBRYzyJ8zCSKB3/giphy.gif`)
          .setTimestamp()
          .setFooter({ text: "ID: 02001", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
          message.channel.send({ embeds: [embed]})      
                  }
                  }
                }
              }
                /* ========
                  DEFENDING
                  ========== */
              // Knife defence A main
              if(args[1] === 'knife'){
                  if(args[2] === 'a' || args[2] === 'amain'){     
                    if(args[3] === 'main' || args[2] === 'amain' ){                 
            const embed = new EmbedBuilder()
            .setColor(kayoColour)
            .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
            .setAuthor({ name: 'Knife A Main from Garden', iconURL: kayoKnifeIcon})
            .setThumbnail('https://cdn.discordapp.com/attachments/1086176823181840384/1086177537903820861/Screenshot_1050.png')
            .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
            .addFields({name: "Rating:", value: "10/10", inline: true})
            .addFields({name: "Difficulty:", value: "Easy", inline: true})
            .addFields({name: "Notes:", value: `
            Stand on the barrel and align your crosshair on the bottom right hand corner of yellow roof
            `, inline: false})
            .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODBlMGZjZDQzZDIxMGM3NWFmMGU0N2FkNWMwZTllMzYxNzQ4OWM5ZCZjdD1n/PbPN9ncZ6TkcxczeSY/giphy-downsized-large.gif`)
            .setTimestamp()
            .setFooter({ text: "ID: 02002", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
            
            const embed2 = new EmbedBuilder()
            .setColor(kayoColour)
            .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
            .setAuthor({ name: 'Knife A Main from Heaven Hall', iconURL: kayoKnifeIcon})
            .setThumbnail('https://cdn.discordapp.com/attachments/1086176823181840384/1086177537903820861/Screenshot_1050.png')
            .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
            .addFields({name: "Rating:", value: "10/10", inline: true})
            .addFields({name: "Difficulty:", value: "Medium", inline: true})
            .addFields({name: "Notes:", value: `
            Go into the corner, and line up the swiggly line of left hud with the tile roof
            `, inline: false})
            .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDkxYWI3MzZkOTdlMDdjODJjMDg5OWFmMDIzYmVmMWVjYTU0MDY5OCZjdD1n/1eS19JESuNWKUvkg6V/giphy-downsized-large.gif`)
            .setTimestamp()
            .setFooter({ text: "ID: 02003", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
            
            const embed3 = new EmbedBuilder()
            .setColor(kayoColour)
            .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
            .setAuthor({ name: 'Knife A Main from B Site', iconURL: kayoKnifeIcon})
            .setThumbnail('https://cdn.discordapp.com/attachments/1086176823181840384/1086177537903820861/Screenshot_1050.png')
            .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
            .addFields({name: "Rating:", value: "10/10", inline: true})
            .addFields({name: "Difficulty:", value: "Medium", inline: true})
            .addFields({name: "Notes:", value: `
            Go into the corner, and line up the top right of the flash icon with the bottom right corner of the electrical box
            `, inline: false})
            .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjEyMzYzOTg2YzZkMTUzYTI3OGZjZWRlYjcyMDc5NzAwZTM5YWNkNCZjdD1n/nuyOOQleX01Pl9Lxtk/giphy-downsized-large.gif`)
            .setTimestamp()
            .setFooter({ text: "ID: 02004", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
            
            const embed4 = new EmbedBuilder()
            .setColor(kayoColour)
            .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
            .setAuthor({ name: 'Knife A Main from Stairs', iconURL: kayoKnifeIcon})
            .setThumbnail('https://cdn.discordapp.com/attachments/1086176823181840384/1086177537903820861/Screenshot_1050.png')
            .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
            .addFields({name: "Rating:", value: "10/10", inline: true})
            .addFields({name: "Difficulty:", value: "Medium", inline: true})
            .addFields({name: "Notes:", value: `
            stand next to the different colour brick in the wall\nline up the swiggly line of right hud to top left corner of the box
            `, inline: false})
            .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBjMjg3OTM5OGJmNzc3ZTc4MTAxNGVhZGMzYTFkZDBkMmUxYzUxYSZjdD1n/LADPIxZTJPkVbLAqXM/giphy-downsized-large.gif`)
            .setTimestamp()
            .setFooter({ text: "ID: 02005", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
            

            const button = new ActionRowBuilder()

            
  .addComponents(
    new ButtonBuilder()
    .setCustomId(`garden`)
    .setLabel(`Garden`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`heavenHall`)
    .setLabel(`Heaven Hall`)
    .setStyle(ButtonStyle.Primary),


    new ButtonBuilder()
    .setCustomId(`bsite`)
    .setLabel(`B Site`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`stairs`)
    .setLabel(`Stairs`)
    .setStyle(ButtonStyle.Primary),
  )
    await message.channel.send({embeds: [embed], components: [button]}).then(async (msg) => {
     let collector = await msg.createMessageComponentCollector();
      collector.on('collect', async (i) => {
        if(i.customId === 'heavenHall'){
            

          await i.update({embeds: [embed2], components: [button]})
        }
        else if(i.customId === 'garden'){
          await i.update({embeds: [embed], components: [button]})
        } else if(i.customId === 'bsite'){
           

          await i.update({embeds: [embed3], components: [button]})
        } else if(i.customId === 'stairs'){
          await i.update({embeds: [embed4], components: [button]})
        }
       })
    })
    break;
                      }
                    
                  }
                } 
                // knife defence b main
                if(args[1] === 'knife'){
                  if(args[2] === 'b' || args[2] === 'bmain'){     
                    if(args[3] === 'main' || args[2] === 'bmain' ){  
                      const embed = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                      .setAuthor({ name: 'Knife B Main from Tree', iconURL: kayoKnifeIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086176823181840384/1086179410287284294/Screenshot_1051.png?width=2428&height=1366')
                      .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "10/10", inline: true})
                      .addFields({name: "Difficulty:", value: "medium", inline: true})
                      .addFields({name: "Notes:", value: `
                      Stand in the corner in tree\nline up the top left tip of kayo icon to top right side of lamp
                      `, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWVlNTYyYThhY2E3MDk2NzMxMTQ4OGFjNTUzNzY2ZDhkNGU3OTBkYSZjdD1n/kq9X0tcFY1QlAEsm5s/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02006", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      
                      const embed2 = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                      .setAuthor({ name: 'Knife B Main from Heaven Box', iconURL: kayoKnifeIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086176823181840384/1086179410287284294/Screenshot_1051.png?width=2428&height=1366')
                      .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "10/10", inline: true})
                      .addFields({name: "Difficulty:", value: "Hard", inline: true})
                      .addFields({name: "Notes:", value: `
                      Go into the corner, and line up your crosshair where the right pole and the gap in tree leaf meets up, then jump and throw the knfie when at maximum height
                      `, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjZjNmMwMzAzNzVkM2QxNWEzZTI2ZDQ5YTk0Mzc4NDM5NGJmODVlMSZjdD1n/Ynyam9lJctMAzbe58b/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02007", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      
                      const embed3 = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                      .setAuthor({ name: 'Knife B Main from Garden', iconURL: kayoKnifeIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086176823181840384/1086179410287284294/Screenshot_1051.png?width=2428&height=1366')
                      .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "10/10", inline: true})
                      .addFields({name: "Difficulty:", value: "Medium", inline: true})
                      .addFields({name: "Notes:", value: `
                       stand next to the small box,\nLine up the left tip of right hud to the top right corner of the window.
                      `, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGUzMDRlZDhhOWI5ZGQ0MGQxZmJkZWM0ZWRjNjVlZWM1MGVhYTg4YyZjdD1n/hCGF0rjGYikZkXPqgE/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02008", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      
                      
                      const button = new ActionRowBuilder()
          
                      
            .addComponents(
              new ButtonBuilder()
              .setCustomId(`tree`)
              .setLabel(`Tree`)
              .setStyle(ButtonStyle.Success),
          
              new ButtonBuilder()
              .setCustomId(`heavenBox`)
              .setLabel(`Heaven Box`)
              .setStyle(ButtonStyle.Primary),
          
          
              new ButtonBuilder()
              .setCustomId(`garden`)
              .setLabel(`Garden`)
              .setStyle(ButtonStyle.Success),
          
      
            )
              await message.channel.send({embeds: [embed], components: [button]}).then(async (msg) => {
               let collector = await msg.createMessageComponentCollector();
                collector.on('collect', async (i) => {
                  if(i.customId === 'tree'){
                      
          
                    await i.update({embeds: [embed2], components: [button]})
                  }
                  else if(i.customId === 'heavenBox'){
                    await i.update({embeds: [embed], components: [button]})
                  } else if(i.customId === 'garden'){
                     
          
                    await i.update({embeds: [embed3], components: [button]})
                  } 
                 })
              })
              break;
                    }
                  }
                } 
                // Flash B main defence
                if(args[1] === 'flash'){
                    if(args[2] === 'b' || args[2] === 'bmain'){     
                      if(args[3] === 'main' || args[2] === 'bmain' ){        
              const embed = new EmbedBuilder()
              .setColor(kayoColour)
              .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
              .setAuthor({ name: 'Flash B Main', iconURL: kayoFlashIcon})
              .setThumbnail('https://cdn.discordapp.com/attachments/1086547330553098301/1086547550854725642/Screenshot_1020.png')
              // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
              .addFields({name: "Rating:", value: "9/10", inline: true})
              .addFields({name: "Difficulty:", value: "easy", inline: true})
              .addFields({name: "Notes:", value: `line yourself up in the middle of the wall\nlineup your crosshair to where the 2 points meet`, inline: false})
              .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTU0MzM2MzVlMTIwYWE4Y2Q1YTFkMTA4MDk1M2FjNmM1MzlkYzI5MyZjdD1n/SkF0KoXtc5nzRT80wj/giphy-downsized-large.gif`)
              .setTimestamp()
              .setFooter({ text: "ID: 02009", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
              message.channel.send({ embeds: [embed]})      
                      }
                      
                    }
                  }  

                  // flash Tiles
                  if(args[1] === 'flash'){
                    if(args[2] === 'tiles'){     
              const embed = new EmbedBuilder()
              .setColor(kayoColour)
              .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
              .setAuthor({ name: 'Flash Tiles', iconURL: kayoFlashIcon})
              .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086548787805302784/Screenshot_1026.png?width=2428&height=1366')
              .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
              .addFields({name: "Rating:", value: "10/10", inline: true})
              .addFields({name: "Difficulty:", value: "easy", inline: true})
              .addFields({name: "Notes:", value: `line yourself up in the middle of the doors\nlineup your crosshair to the right side of the board`, inline: false})
              .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFkNjI0Mzc0MjQ5YzVmNWQ0MDZjYTE1NzEzY2JjMzMzMjM4OWFiZCZjdD1n/aUEXkm3js2TE9YszDf/giphy-downsized-large.gif`)
              .setTimestamp()
              .setFooter({ text: "ID: 02010", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
              
              const embed2 = new EmbedBuilder()
              .setColor(kayoColour)
              .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
              .setAuthor({ name: 'Flash Tiles', iconURL: kayoFlashIcon})
              .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086548787805302784/Screenshot_1026.png?width=2428&height=1366')
              // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
              .addFields({name: "Rating:", value: "10/10", inline: true})
              .addFields({name: "Difficulty:", value: "easy", inline: true})
              .addFields({name: "Notes:", value: `line yourself up with the door knob\nline your crosshair with the top of the edge wall\nrun and throw flash`, inline: false})
              .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDI4MDAzN2MwNWMxNTAzNzdmM2NiY2VlY2U4MGY1NzQyNmQ4MDczNyZjdD1n/DKpwyOkKJRwV8ZMGyW/giphy.gif`)
              .setTimestamp()
              .setFooter({ text: "ID: 02011", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})

              const button = new ActionRowBuilder()
          
                      
            .addComponents(
              new ButtonBuilder()
              .setCustomId(`lineup1`)
              .setLabel(`Lineup 1`)
              .setStyle(ButtonStyle.Success),
          
              new ButtonBuilder()
              .setCustomId(`lineup2`)
              .setLabel(`Lineup 2`)
              .setStyle(ButtonStyle.Primary),         
      
            )
              await message.channel.send({embeds: [embed], components: [button]}).then(async (msg) => {
               let collector = await msg.createMessageComponentCollector();
                collector.on('collect', async (i) => {
                  if(i.customId === 'lineup1'){
                      
          
                    await i.update({embeds: [embed], components: [button]})
                  }
                  else if(i.customId === 'lineup2'){
                    await i.update({embeds: [embed2], components: [button]})
                  } 
                 })
              })
                      }
                      
                    }  
                  
                    // flash site for boat house player
                    if(args[1] === 'flash'){
                    if(args[2] === 'lane' || args[2] === 'stairs'){  

                  const embed = new EmbedBuilder()
                  .setColor(kayoColour)
                  .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                  .setAuthor({ name: 'Flash for teammate Back Site on B site', iconURL: kayoFlashIcon})
                  .setThumbnail('https://cdn.discordapp.com/attachments/1086547330553098301/1086549216744194128/Screenshot_1027.png')
                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                  .addFields({name: "Rating:", value: "10/10", inline: true})
                  .addFields({name: "Difficulty:", value: "easy", inline: true})
                  .addFields({name: "Notes:", value: `stand anywhere in ct and line up your crosshair to the middle of orange piller, and run a jump throw flash`, inline: false})
                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmYyZmRjZDNkZDFlMTFlZjIyYjZjZmQwOGE0M2VmNzljNjllMjk0YyZjdD1n/IrAQCIPW6MW56fqZFy/giphy-downsized-large.gif`)
                  .setTimestamp()
                  .setFooter({ text: "ID: 02012", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                  message.channel.send({ embeds: [embed]})      
                                          }
                          }  

                          // flash a main ---- 02013
                          if(args[1] === 'flash'){
                            if(args[2] === 'a' || args[2] === 'amain'){     
                              if(args[3] === 'main' || args[3] === 'defence'){  
                                if(args[4] === 'defence' || args[3] === 'defence'){              
                      const embed = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                      .setAuthor({ name: 'Flash A Main', iconURL: kayoFlashIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086549927154421880/Screenshot_1028.png?width=2428&height=1366')
                      // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "9/10", inline: true})
                      .addFields({name: "Difficulty:", value: "easy", inline: true})
                      .addFields({name: "Notes:", value: `go into the corner, and line up your crosshair to bottom of top right line`, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWVmNjgwNzNjYTUzYTY2OTM5YjhlNTYzZTBiMjNjMGJhYTQ3MTRmOSZjdD1n/g7SMwhu2dEHNdS6BSI/giphy.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02013", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      message.channel.send({ embeds: [embed]})      
                              }
                              
                            }
                          }  
                        }
                            // flash mid
                          if(args[1] === 'flash'){
                            if(args[2] === 'mid'){     
                      const embed = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                      .setAuthor({ name: 'Flash Mid', iconURL: kayoFlashIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086550108465795104/Screenshot_1039.png?width=2428&height=1366')
                      // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "8/10", inline: true})
                      .addFields({name: "Difficulty:", value: "easy", inline: true})
                      .addFields({name: "Notes:", value: `stand in the corner, line up your crosshair with the gap in the roof`, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmJiZGNjMzU2N2EwODYzZGYwZGI4OWZkNWViMmU2ZTAyMWJmYjQzNiZjdD1n/2zoCyT0ae5Yo0xXec0/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02014", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      
                      const embed2 = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                      .setAuthor({ name: 'Flash Mid', iconURL: kayoFlashIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086550108465795104/Screenshot_1039.png?width=2428&height=1366')
                      // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "8/10", inline: true})
                      .addFields({name: "Difficulty:", value: "easy", inline: true})
                      .addFields({name: "Notes:", value: `line yourself with the wall and aim the the top of the roof of building`, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGY5NmViMDVmY2FlM2RmMzU4YmE0MmUzZGFhNGU4OTcwMTdkZTllOCZjdD1n/0NMlnOxRP41JVLmUah/giphy.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02015", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
        
                      const button = new ActionRowBuilder()
                  
                              
                    .addComponents(
                      new ButtonBuilder()
                      .setCustomId(`lineup1`)
                      .setLabel(`Lineup 1`)
                      .setStyle(ButtonStyle.Success),
                  
                      new ButtonBuilder()
                      .setCustomId(`lineup2`)
                      .setLabel(`Lineup 2`)
                      .setStyle(ButtonStyle.Primary),         
              
                    )
                      await message.channel.send({embeds: [embed], components: [button]}).then(async (msg) => {
                       let collector = await msg.createMessageComponentCollector();
                        collector.on('collect', async (i) => {
                          if(i.customId === 'lineup1'){
                              
                  
                            await i.update({embeds: [embed], components: [button]})
                          }
                          else if(i.customId === 'lineup2'){
                            await i.update({embeds: [embed2], components: [button]})
                          } 
                         })
                      })
                    
                              }
                              
                            }
                          /*==========
                            ATTACKING
                            ==========*/
                            // knife close site/a main and wine
                            if(args[1] === 'knife'){
                              if(args[2] === 'wine' || args[2] === 'close'){
                                if(args[2] === 'wine' || args[3] === 'site'){     
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Knife Close Site & Wine', iconURL: kayoKnifeIcon})
                          .setThumbnail('https://media.discordapp.net/attachments/1086542162826633236/1086542281328300082/Screenshot_1042.png?width=2428&height=1366')
                          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Medium", inline: true})
                          .addFields({name: "Notes:", value: `stand next to the edge of the wall,\naim the left tip of the knife icon to the edge of the grey wall`, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDBhMDQyNDZlMWU1YmEzM2EyYmViMGRmZGU5NjdiMTBjOTRjNTk0MSZjdD1n/oCF6HDO5o2wxjgRPZj/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02016", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                                }
                              } 
                            }
                              // knife a site
                            if(args[1] === 'knife'){
                              if(args[2] === 'a' || args[2] === 'asite'){
                                if(args[2] === 'asite' || args[3] === 'site'){     
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Knife A Site', iconURL: kayoKnifeIcon})
                          .setThumbnail('https://media.discordapp.net/attachments/1086542162826633236/1086543293472583700/Screenshot_1045.png?width=2428&height=1366')
                          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `stand in front of the box, line up the right tip of left hud to the white tip `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2YwOTc5NGRkZGU1MDAzNDA2MDNkMGExYmY4MGU4N2UwYWNkMTM3OCZjdD1n/1X1eLagLbQKlKsmxDZ/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02017", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                                }
                              } 
                            }

                            // knife market
                            if(args[1] === 'knife'){
                              if(args[2] === 'market'){     
                                
                                  const embed = new EmbedBuilder()
                                  .setColor(kayoColour)
                                  .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                                  .setAuthor({ name: 'Knife Market from Top Mid', iconURL: kayoKnifeIcon})
                                  .setThumbnail('https://media.discordapp.net/attachments/1086542540385308763/1086542671402778674/Screenshot_1046.png?width=2428&height=1366')
                                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                                  .addFields({name: "Rating:", value: "10/10", inline: true})
                                  .addFields({name: "Difficulty:", value: "Medium", inline: true})
                                  .addFields({name: "Notes:", value: `
                                  stand at the edge of the wall,\nline up the middle of left hud with the corner of the wall
                                  `, inline: false})
                                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWRiYzlhNTQ5ZDAxYTBlZWVjNTRmNDFjZjdmYTU0NzIxMGFmYThmZSZjdD1n/2ftD3aaXCUfnahHNKO/giphy-downsized-large.gif`)
                                  .setTimestamp()
                                  .setFooter({ text: "ID: 02018", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                                  
                                  const embed2 = new EmbedBuilder()
                                  .setColor(kayoColour)
                                  .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                                  .setThumbnail('https://media.discordapp.net/attachments/1086542540385308763/1086542671402778674/Screenshot_1046.png?width=2428&height=1366')
                                  .setAuthor({ name: 'Knife Market from Tiles', iconURL: kayoKnifeIcon})
                                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                                  .addFields({name: "Rating:", value: "10/10", inline: true})
                                  .addFields({name: "Difficulty:", value: "Medium", inline: true})
                                  .addFields({name: "Notes:", value: `
                                  Line yourself up with the corner of the barrier next to the wall,\naim the top left tip of knife icon with the right roof tile
                                  `, inline: false})
                                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODYzYTUzMTdkMjZkMzkxMTA4MTdhOTQ3ZTUyZGZkYzY1ZTU4NmRjMiZjdD1n/vb7hZs39iyAB9hClrB/giphy-downsized-large.gif`)
                                  .setTimestamp()
                                  .setFooter({ text: "ID: 02019", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})

                                  
                                  const button = new ActionRowBuilder()
                      
                                  
                        .addComponents(
                          new ButtonBuilder()
                          .setCustomId(`topMid`)
                          .setLabel(`Top Mid`)
                          .setStyle(ButtonStyle.Success),
                      
                          new ButtonBuilder()
                          .setCustomId(`tiles`)
                          .setLabel(`Tiles`)
                          .setStyle(ButtonStyle.Primary),
                      
                      
                          
                      
                  
                        )
                          await message.channel.send({embeds: [embed], components: [button]}).then(async (msg) => {
                           let collector = await msg.createMessageComponentCollector();
                            collector.on('collect', async (i) => {
                              if(i.customId === 'topMid'){
                                  
                      
                                await i.update({embeds: [embed], components: [button]})
                              }
                              else if(i.customId === 'tiles'){
                                await i.update({embeds: [embed2], components: [button]})
                              } 
                             })
                          })
                          break;
                                }
                              }
                            
                              // knife b site close and market
                            if(args[1] === 'knife'){
                              if(args[2] === 'logs'){
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Knife Close B site & market & logs', iconURL: kayoKnifeIcon})
                          .setThumbnail('https://cdn.discordapp.com/attachments/1086542580247957614/1086542829838413844/Screenshot_1047.png')
                          // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "8/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `stand anywhere in tiles and knife through the fence `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGJkMmIxNmYwMWNiYzY0ZjBkNTUxZDQwM2E1YWI0NDk5ODNmNjM5OSZjdD1n/U7qksuVKSbWei3F2mX/giphy.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02020", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                              
                              } 
                            }

                            // knife b site and switch
                            if(args[1] === 'knife'){
                              if(args[2] === 'switch'){
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Knife B site & switch', iconURL: kayoKnifeIcon})
                          .setThumbnail('https://media.discordapp.net/attachments/1086542580247957614/1086543017843900497/Screenshot_1049.png?width=2428&height=1366')
                          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `stand in the corner\naim your crosshair to the gap in the window `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWFlZmY0NjRlNjFkMmI3MmYyNTI3YTRiYmFlYjNiMjZiODIxNThmZSZjdD1n/bOyQ3OjKt2VnmCWkDH/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02021", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                              
                              } 
                            }

                            // flash a site
                            if(args[1] === 'flash'){
                              if(args[2] === 'a' || args[2] === 'asite'){     
                                if(args[3] === 'site' || args[2] ===  'asite'){
                                
                                  const embed = new EmbedBuilder()
                                  .setColor(kayoColour)
                                  .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                                  .setAuthor({ name: 'Flash A Site', iconURL: kayoFlashIcon})
                                  .setThumbnail('https://media.discordapp.net/attachments/1086547287142051850/1086547414279798815/Screenshot_1030.png?width=2428&height=1366')
                                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                                  .addFields({name: "Rating:", value: "10/10", inline: true})
                                  .addFields({name: "Difficulty:", value: "Easy", inline: true})
                                  .addFields({name: "Notes:", value: `
                                  stand against the wall\nline the right tip of right hud to the bottom of the top left light blub
                                  `, inline: false})
                                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I0YWI4NDI4ZDcwM2MyNjVlNDFjMzE3ZTU5MGJiYjY0MWIzYzZkNyZjdD1n/GTd0QuLURTtiGYsAx8/giphy-downsized-large.gif`)
                                  .setTimestamp()
                                  .setFooter({ text: "ID: 02022", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                                  
                                  const embed2 = new EmbedBuilder()
                                  .setColor(kayoColour)
                                  .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                                  .setThumbnail('https://media.discordapp.net/attachments/1086547287142051850/1086547414279798815/Screenshot_1030.png?width=2428&height=1366')
                                  .setAuthor({ name: 'Flash A Site', iconURL: kayoFlashIcon})
                                  // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                                  .addFields({name: "Rating:", value: "10/10", inline: true})
                                  .addFields({name: "Difficulty:", value: "Easy", inline: true})
                                  .addFields({name: "Notes:", value: `
                                  stand anywhere along the wall\naim your crosshair to the first bump of the cloud
                                  `, inline: false})
                                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2U0YzVmMGQxNWYwZmY3NTUwNzQ3YmI2NGQwODk5ZWEyNWM1MzJjMiZjdD1n/2kuDPiy8OJ0DSeRDiv/giphy-downsized-large.gif`)
                                  .setTimestamp()
                                  .setFooter({ text: "ID: 02023", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})

                                  
                                  const button = new ActionRowBuilder()
                      
                                  
                        .addComponents(
                          new ButtonBuilder()
                          .setCustomId(`lineup1`)
                          .setLabel(`Lineup 1`)
                          .setStyle(ButtonStyle.Success),
                      
                          new ButtonBuilder()
                          .setCustomId(`lineup2`)
                          .setLabel(`Lineup 2`)
                          .setStyle(ButtonStyle.Primary),
                      
                      
                          
                      
                  
                        )
                          await message.channel.send({embeds: [embed], components: [button]}).then(async (msg) => {
                           let collector = await msg.createMessageComponentCollector();
                            collector.on('collect', async (i) => {
                              if(i.customId === 'lineup1'){
                                  
                      
                                await i.update({embeds: [embed], components: [button]})
                              }
                              else if(i.customId === 'lineup2'){
                                await i.update({embeds: [embed2], components: [button]})
                              } 
                             })
                          })
                          break;
                                }
                              }
                            }
                            // Flash A site toward gen
                            if(args[1] === 'flash'){
                              if(args[2] === 'gen' || args[2] === 'generator'){
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Flash A site Toward Generator', iconURL: kayoFlashIcon})
                          .setThumbnail('https://media.discordapp.net/attachments/1086547287142051850/1086549462207438899/Screenshot_1037.png?width=2428&height=1366')
                          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `
                          stand in the corner\naim your crosshair below the gap in the cloud
                          `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWQyNDQ5OWZjZTc4NWZiZTVhOTg2YWEwNDNiYmE3MjcxYTFmZTRjMSZjdD1n/HOIgYPU01rl9zl0lIL/giphy.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02026", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                              
                              } 
                            }

                            // flash tree
                            if(args[1] === 'flash'){
                              if(args[2] === 'tree'){
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Flash Tree', iconURL: kayoFlashIcon})
                          .setThumbnail('https://cdn.discordapp.com/attachments/1086547287142051850/1086551335392002048/Screenshot_1053.png')
                          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Medium", inline: true})
                          .addFields({name: "Notes:", value: `
                          stand in the corner\naim your crosshair slightly to the right of the first line and run and throw flash
                          `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGE1YTcyMzQyNzExYjNiNWUwMDMwOWRkM2JjMmU1OTg2NzA2ZDkzOSZjdD1n/fTASUmngwJ5ba7MNWP/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02027", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                              
                              } 
                            }

                            // flash A main
                            if(args[1] === 'flash'){
                              if(args[2] === 'a' || args[2] === 'amain'){
                                if(args[3] === 'main' || args[3] === 'attack' || args[3] === 'push' || args[3] === 'peak'){
                                  if(args[4] === 'attack' || args[3] === 'attack' || args[4] === 'push' || args[4] === 'peak' || args[3] === 'push' || args[3] === 'peak'){
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Flash A Main', iconURL: kayoFlashIcon})
                          .setThumbnail('https://cdn.discordapp.com/attachments/1086547287142051850/1086551422675460146/Screenshot_1054.png')
                          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `
                          stand at the edge of the wall\naim your crosshair to the corner of the roof tile
                          `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDZhOTk2Y2Y1MWJjN2U0YjU5NjAxYTY1MDg5MThiYmJhNDAwZGE3ZSZjdD1n/tpOlqpKcYsEkf02CDK/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02028", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                              
                              } 
                            }
                          }
                        }

                        // Molly Stairs
                        if(args[1] === 'molly'){
                          if(args[2] === 'stairs'){
                      const embed = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                      .setAuthor({ name: 'Molly Stairs', iconURL: kayoMollyIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086544228194197635/1086545301470466129/Screenshot_1059.png?width=2428&height=1366')
                      .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "8/10", inline: true})
                      .addFields({name: "Difficulty:", value: "Hard", inline: true})
                      .addFields({name: "Notes:", value: `
                      stand in the corner\nline up your crosshair to where the to points meet, then jump and throw molly
                      `, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjc4NTAwZDQ0MWUzYzcyY2U5OWI1OWM3NmFkZDg3NDcyMWZmZDYwNiZjdD1n/NzPYFewPp2yUTH7QmP/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02029", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      message.channel.send({ embeds: [embed]})      
                              
                              
                          
                          
                        
                      }
                    }
                    // Molly CT
                    if(args[1] === 'molly'){
                      if(args[2] === 'ct'){
                  const embed = new EmbedBuilder()
                  .setColor(kayoColour)
                  .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                  .setAuthor({ name: 'Molly CT', iconURL: kayoMollyIcon})
                  .setThumbnail('https://cdn.discordapp.com/attachments/1086544228194197635/1086545396924428348/Screenshot_1060.png')
                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                  .addFields({name: "Rating:", value: "6/10", inline: true})
                  .addFields({name: "Difficulty:", value: "Hard", inline: true})
                  .addFields({name: "Notes:", value: `
                  stand in the corner\nline up your crosshair slightly to the right on the tower, then jump and throw molly
                  `, inline: false})
                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDkwMjY5NWM5MDJmYzg2NDA2NDBmMmMxZmVhNDMwY2ExMmZiZmUzNSZjdD1n/4yybkbVKs9YdHEvYW7/giphy-downsized-large.gif`)
                  .setTimestamp()
                  .setFooter({ text: "ID: 02030", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                  message.channel.send({ embeds: [embed]})      
                          
                          
                      
                      
                    
                  }
                }
                     // Molly Heaven
                     if(args[1] === 'molly'){
                      if(args[2] === 'heaven'){
                  const embed = new EmbedBuilder()
                  .setColor(kayoColour)
                  .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                  .setAuthor({ name: 'Molly Heaven', iconURL: kayoMollyIcon})
                  .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086544382502637658/Screenshot_1034.png?width=2428&height=1366')
                  // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                  .addFields({name: "Rating:", value: "8/10", inline: true})
                  .addFields({name: "Difficulty:", value: "Hard", inline: true})
                  .addFields({name: "Notes:", value: `
                  stand in the corner\nline up your crosshair with the white tip and jump throw
                  `, inline: false})
                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTk2NWZhZWNlYTgzN2Q3YzkwMjg4MmE4NzNmODdhMTI2ZDUyOTVjOSZjdD1n/WLBeMA8oCID43dQQmE/giphy-downsized-large.gif`)
                  .setTimestamp()
                  .setFooter({ text: "ID: 02031", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                  
                  const embed2 = new EmbedBuilder()
                  .setColor(kayoColour)
                  .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                  .setAuthor({ name: 'Molly Heaven', iconURL: kayoMollyIcon})
                  .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086544382502637658/Screenshot_1034.png?width=2428&height=1366')
                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                  .addFields({name: "Rating:", value: "8/10", inline: true})
                  .addFields({name: "Difficulty:", value: "Hard", inline: true})
                  .addFields({name: "Notes:", value: `
                  stand next to the wall\nline up your the left hud of your ult icon with the top left of lamp bracket
                  `, inline: false})
                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjg2NTUwOTgyNzBjNTM5MThhNDE1ZDEwOTg5ODJlYjg4OTM3MjhlZiZjdD1n/uocYjmI0EOvlHs9pPG/giphy-downsized-large.gif`)
                  .setTimestamp()
                  .setFooter({ text: "ID: 02032", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                  const button = new ActionRowBuilder()
                      
                                  
                  .addComponents(
                    new ButtonBuilder()
                    .setCustomId(`lineup1`)
                    .setLabel(`Lineup 1`)
                    .setStyle(ButtonStyle.Success),
                
                    new ButtonBuilder()
                    .setCustomId(`lineup2`)
                    .setLabel(`Lineup 2`)
                    .setStyle(ButtonStyle.Primary),
                
                
                    
                
            
                  )
                    await message.channel.send({embeds: [embed], components: [button]}).then(async (msg) => {
                     let collector = await msg.createMessageComponentCollector();
                      collector.on('collect', async (i) => {
                        if(i.customId === 'lineup1'){
                            
                
                          await i.update({embeds: [embed], components: [button]})
                        }
                        else if(i.customId === 'lineup2'){
                          await i.update({embeds: [embed2], components: [button]})
                        } 
                       })
                    })
                    break;
                          
                        
                          
                      
                      
                    
                  }
                }

                // Molly Dice --- 02033
                if(args[1] === 'molly'){
                  if(args[2] === 'dice'){
              const embed = new EmbedBuilder()
              .setColor(kayoColour)
              .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
              .setAuthor({ name: 'Molly Dice', iconURL: kayoMollyIcon})
              .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086544576975740978/Screenshot_1035.png?width=2428&height=1366')
              .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
              .addFields({name: "Rating:", value: "10/10", inline: true})
              .addFields({name: "Difficulty:", value: "Easy", inline: true})
              .addFields({name: "Notes:", value: `
              stand in the corner\nline up your left hud underneath the wooden piece and 4 bricks to the right
              `, inline: false})
              .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDIyZTg4ZDE2Y2VjMzhiNmU2NDdhNmNlMzMxNjY2OTZjZmI3NDYyMyZjdD1n/cHIZSL5aHBcA6xasio/giphy-downsized-large.gif`)
              .setTimestamp()
              .setFooter({ text: "ID: 02033", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
              message.channel.send({ embeds: [embed]})      

              }
            }
            // Molly Tree --- 02034
            if(args[1] === 'molly'){
              if(args[2] === 'tree'){
          const embed = new EmbedBuilder()
          .setColor(kayoColour)
          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
          .setAuthor({ name: 'Molly Tree', iconURL: kayoMollyIcon})
          .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086544834002681876/Screenshot_1058.png?width=2428&height=1366')
          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
          .addFields({name: "Rating:", value: "10/10", inline: true})
          .addFields({name: "Difficulty:", value: "Hard", inline: true})
          .addFields({name: "Notes:", value: `
          stand against the edge of the wall\nline up your crosshair with second line, and jump and then throw molly
          `, inline: false})
          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTcyODVkYTk1MmQ5ZTUyNDVhMjQ1NDZmNjljZDcxOGM4MzY5ZDZhNCZjdD1n/YJHOtP2qA4jUXhDNzn/giphy-downsized-large.gif`)
          .setTimestamp()
          .setFooter({ text: "ID: 02034", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
          message.channel.send({ embeds: [embed]})    
          
              }
            }

            // molly gen --- 02035
            if(args[1] === 'molly'){
              if(args[2] === 'generator' || args[2] === 'gen'){
          const embed = new EmbedBuilder()
          .setColor(kayoColour)
          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
          .setAuthor({ name: 'Molly Generator', iconURL: kayoMollyIcon})
          .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086545983678201886/Screenshot_1036.png?width=2428&height=1366')
          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
          .addFields({name: "Rating:", value: "10/10", inline: true})
          .addFields({name: "Difficulty:", value: "Medium", inline: true})
          .addFields({name: "Notes:", value: `
          stand in the corner\nline up the right tip of right hud to the top left of the box
          `, inline: false})
          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzY3ZjQxODM0YjQyM2M1ZWRjMTMyMTg0NjRiYzZhNmZhNmNmNTUzOCZjdD1n/Utec1UcqnIL9fTkRGo/giphy-downsized-large.gif`)
          .setTimestamp()
          .setFooter({ text: "ID: 02035", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
          message.channel.send({ embeds: [embed]})    
          
              }
            }


                            /* ===================
                                  POST PLANT
                                ================
                                  */
                            // flash b site Post Plant
                            if(args[1] === 'flash'){
                              if(args[2] === 'anti'){
                                if(args[3] === 'retake'){
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Flash Anti Retake', iconURL: kayoFlashIcon})
                          .setThumbnail('https://cdn.discordapp.com/attachments/1086547287142051850/1086547687534514186/Screenshot_1022.png')
                          // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "4/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `
                          stand on the ledge of lane\naim at the tip of roof
                          `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTFlYzc1MjVjZTc0MGIwOGU1MjI4MTU5NTMzYWE5N2Y0NTNmNjFkNCZjdD1n/4aauOEUoN6KhogxkbH/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02024", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                                }
                              } 
                            }

                             // flash A Site Heaven
                             if(args[1] === 'flash'){
                              if(args[2] === 'heaven'){
                          const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
                          .setAuthor({ name: 'Flash Heaven', iconURL: kayoFlashIcon})
                          .setThumbnail('https://cdn.discordapp.com/attachments/1086547287142051850/1086548328126361761/Screenshot_1025.png')
                          // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `
                          stand anywhere along the wall\naim anywhere on the tip of the window
                          `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjdmOWYyZWM0MzFkZGNjNjk5ZWZmNDBhYmJhZWE5YjhiODMyZDkxYyZjdD1n/b3VmSU1DLBi44XX9F2/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02025", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
                                  
                                  
                                
                              } 
                            }


                      
                  



          
  
      
        } // end of ascent curly brackets
        
    break;

    case 'viper': 
    // map Icebox
        if(args[0] === 'icebox'){
   let viperIceboxHelp = new EmbedBuilder()
  .setColor(viperColour)
  .setAuthor({name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
  .setTitle(`Viper Lineups Icebox`)
  .addFields({name: "Defending", value: "> Orb Lineups\n> Wall Lineups\n> Anti Plant Lineups\n> Retake Lineups", inline: true})
  .addFields({name: "Attacking", value: "> Orb Exceutes\n> Molly Executes\n> Wall Executes", inline: true})
  .addFields({name: "Post Plant", value: "> Post Plant Molly Lineups", inline: true})
  .addFields({name: "Other", value: "> Ult Lineups", inline: true})
  .setFooter({text:`Requested by: ${message.author.username}`, iconURL: message.author.displayAvatarURL()})

let viperIceboxAttack = new EmbedBuilder()
          .setColor(viperColour)
          .setTitle(`Viper Icebox Attack Lineups`)
          .addFields({name: "Orb Executes A site", value: `${prefixDisplay}viper icebox orb rafters`, inline: true})
          .addFields({name: "Orb Executes Mid", value: `${prefixDisplay}viper icebox orb mid`, inline: true})
          .addFields({name: "Orb Executes B site", value: ` `, inline: true})
          .addFields({name: "Wall Executes", value: ` `, inline: true})
          .addFields({name: "Molly Lineups A site", value: ` `, inline: true})
          .addFields({name: "Molly Lineups B site", value: ` `, inline: true})
          .setTimestamp()

          let viperIceboxDefence = new EmbedBuilder()
          .setColor(viperColour)
          .setTitle(`Viper Icebox Defence Lineups`)
          .addFields({name: "Orb Lineups", value: ` `, inline: true})
          .addFields({name: "Wall Lineups", value: ` `, inline: true})
          .addFields({name: "Retake Lineups", value: ` `, inline: true})
          .addFields({name: "Anti Plant Lineups", value: ` `, inline: true})
          .setTimestamp()

          let ViperIceboxPostPlantLineups = new EmbedBuilder()
          .setColor(viperColour)
          .setTitle(`Viper Icebox Post Plant Lineups`)
          .addFields({name: "A site Molly", value: ` `, inline: true})
          .addFields({name: "B site Molly", value: ` `, inline: true})
          .setTimestamp()

          let ViperIceboxOther = new EmbedBuilder()
          .setColor(viperColour)
          .setTitle(`Viper Icebox other Lineups`)
          .addFields({name: "Ult Lineups", value: ` `, inline: true})
          .setTimestamp()
        
  const button = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
    .setCustomId(`defending`)
    .setLabel(`Defending`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`attacking`)
    .setLabel(`Attacking`)
    .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
    .setCustomId(`postPlant`)
    .setLabel(`Post Plant`)
    .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
    .setCustomId(`other`)
    .setLabel(`Other`)
    .setStyle(ButtonStyle.Secondary),


  )
  if(!args[1]){
    await message.channel.send({embeds: [viperIceboxHelp], components: [button]}).then(async (msg) => {
     let collector = await msg.createMessageComponentCollector();
      collector.on('collect', async (i) => {
        if(i.customId === 'defending'){
          await i.update({embeds: [viperIceboxDefence], components: [button]})
        }
        else if(i.customId === 'attacking'){
          await i.update({embeds: [viperIceboxAttack], components: [button]})
        } else if(i.customId === 'postPlant'){
          await i.update({embeds: [ViperIceboxPostPlantLineups], components: [button]})
        } else if(i.customId === 'other'){
          await i.update({embeds: [ViperIceboxOther], components: [button]})
        }
       })
    })
  }

    /* =======
        Attack Lineups
        ========= */
  // Orb Rafters A site --- 03000
  if(args[1] === 'orb'){
    if(args[2] === 'rafters'){
const embed = new EmbedBuilder()
.setColor(viperColour)
.setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
.setAuthor({ name: 'Orb Rafters A Site', iconURL: viperOrbIcon})
.setThumbnail(thumb03000)
.addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
.addFields({name: "Rating:", value: rating03000, inline: true})
.addFields({name: "Difficulty:", value: difficulty03000, inline: true})
.addFields({name: "Notes:", value: notes03000, inline: false})
.setImage(gif03000)
.setTimestamp()
.setFooter({ text: "ID: 03000", iconURL: viperIcon})
message.channel.send({ embeds: [embed]})      
          
        }
      }

      // orb mid --- 03001,03002,03003
        if(args[1] === 'orb'){
    if(args[2] === 'mid'){
const embed = new EmbedBuilder()
.setColor(viperColour)
.setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
.setAuthor({ name: 'Orb Mid', iconURL: viperOrbIcon})
.setThumbnail(thumb03001)
.addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
.addFields({name: "Rating:", value: rating03001, inline: true})
.addFields({name: "Difficulty:", value: difficulty03001, inline: true})
.addFields({name: "Notes:", value: notes03001, inline: false})
.setImage(gif03001)
.setTimestamp()
.setFooter({ text: "ID: 03001", iconURL: viperIcon})

const embed2 = new EmbedBuilder()
.setColor(viperColour)
.setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
.setAuthor({ name: 'Orb Mid', iconURL: viperOrbIcon})
.setThumbnail(thumb03001)
.addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
.addFields({name: "Rating:", value: rating03002, inline: true})
.addFields({name: "Difficulty:", value: difficulty03002, inline: true})
.addFields({name: "Notes:", value: notes03002, inline: false})
.setImage(gif03002)
.setTimestamp()
.setFooter({ text: "ID: 03002", iconURL: viperIcon})

  const button = new ActionRowBuilder()
                      
                                  
                  .addComponents(
                    new ButtonBuilder()
                    .setCustomId(`mid`)
                    .setLabel(`From Mid`)
                    .setStyle(ButtonStyle.Success),
                
                    new ButtonBuilder()
                    .setCustomId(`asite`)
                    .setLabel(`Mid (push A)`)
                    .setStyle(ButtonStyle.Primary),

                     new ButtonBuilder()
                    .setCustomId(`bsite`)
                    .setLabel(`Push B`)
                    .setStyle(ButtonStyle.Success),
                
                
                    
                
            
                  )
                    await message.channel.send({embeds: [embed], components: [button]}).then(async (msg) => {
                     let collector = await msg.createMessageComponentCollector();
                      collector.on('collect', async (i) => {
                        if(i.customId === 'mid'){
                            
                
                          await i.update({embeds: [embed], components: [button]})
                        }
                        else if(i.customId === 'asite'){
                          await i.update({embeds: [embed2], components: [button]})
                        }else if(i.customId === 'bsite'){
                          await i.update({embeds: [embed3], components: [button]}) 
                        }
                       })
                    })
          
        }
      }
    
        } // viper icebox end bracket
    break;

    case 'lineup':
        
      if(args[0] === '02000' && !args[1]){    //Molly retake killjoy ult
        const embed = new EmbedBuilder()
        .setColor(kayoColour)
        .setAuthor({ name: 'Destroy killjoy retake ult A site', iconURL: kayoMollyIcon})
        .setThumbnail('https://cdn.discordapp.com/attachments/1086545559432740904/1086545669340278854/Screenshot_1061.png')
        .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
        .addFields({name: "Rating:", value: "10/10", inline: true})
        .addFields({name: "Difficulty:", value: "medium", inline: true})
        .addFields({name: "Notes:", value: `wedge yourself with the wall in hell and lineup the middle of your bottom left hud line to the white spot on generator`, inline: false})
     .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzg2MWI5NTQzZWE0NTNjMzJhYTAwOTFlNzIyODc5ZTgwMjRkYzhkMSZjdD1n/uwaEmVk021A8ffPSpc/giphy-downsized-large.gif`)
        .setTimestamp()
        .setFooter({ text: "ID: 02000", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})

    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02001' && !args[1]){ //Molly killjoy b site ult
    const embed = new EmbedBuilder()

          .setColor(kayoColour)
          .setAuthor({ name: 'Destroy Killjoy ult B site', iconURL: kayoMollyIcon})
          .setThumbnail('https://cdn.discordapp.com/attachments/1086545559432740904/1086545782343221289/Screenshot_1062.png')
          // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
          .addFields({name: "Rating:", value: "4/10", inline: true})
          .addFields({name: "Difficulty:", value: "easy", inline: true})
          .addFields({name: "Notes:", value: `stand anywhere in lane and line up your crosshair to the dark line`, inline: false})
          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjA2MjZlN2U5NWJlMTRiZDljOWM1OTNkZDk1ZGZiZTk5OWI2OGYzYyZjdD1n/ZiAchBRYzyJ8zCSKB3/giphy.gif`)
          .setTimestamp()
          .setFooter({ text: "ID: 02001", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
          message.channel.send({ embeds: [embed]})      

  } else if(args[0] === '02002' && !args[1]){ //Knife A main from Garden
    const embed = new EmbedBuilder()
            .setColor(kayoColour)
            .setAuthor({ name: 'Knife A Main from Garden', iconURL: kayoKnifeIcon})
            .setThumbnail('https://cdn.discordapp.com/attachments/1086176823181840384/1086177537903820861/Screenshot_1050.png')
            .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
            .addFields({name: "Rating:", value: "10/10", inline: true})
            .addFields({name: "Difficulty:", value: "easy", inline: true})
            .addFields({name: "Notes:", value: `
            Stand on the barrel and align your crosshair on the bottom right hand corner of yellow roof
            `, inline: false})
            .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODBlMGZjZDQzZDIxMGM3NWFmMGU0N2FkNWMwZTllMzYxNzQ4OWM5ZCZjdD1n/PbPN9ncZ6TkcxczeSY/giphy-downsized-large.gif`)
            .setTimestamp()
            .setFooter({ text: "ID: 02002", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
            message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02003' && !args[1]){ // Knife A main from Heaven Hall
    const embed2 = new EmbedBuilder()
            .setColor(kayoColour)
            .setAuthor({ name: 'Knife A Main from Heaven Hall', iconURL: kayoKnifeIcon})
            .setThumbnail('https://cdn.discordapp.com/attachments/1086176823181840384/1086177537903820861/Screenshot_1050.png')
            .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
            .addFields({name: "Rating:", value: "10/10", inline: true})
            .addFields({name: "Difficulty:", value: "Medium", inline: true})
            .addFields({name: "Notes:", value: `
            Go into the corner, and line up the swiggly line of left hud with the tile roof
            `, inline: false})
            .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDkxYWI3MzZkOTdlMDdjODJjMDg5OWFmMDIzYmVmMWVjYTU0MDY5OCZjdD1n/1eS19JESuNWKUvkg6V/giphy-downsized-large.gif`)
            .setTimestamp()
            .setFooter({ text: "ID: 02003", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
            message.channel.send({embeds: [embed2]})
  } else if(args[0] === '02004' && !args[1]){ // Knife A main from B Site
    const embed3 = new EmbedBuilder()
    .setColor(kayoColour)
            .setAuthor({ name: 'Knife A Main from B Site', iconURL: kayoKnifeIcon})
            .setThumbnail('https://cdn.discordapp.com/attachments/1086176823181840384/1086177537903820861/Screenshot_1050.png')
            .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
            .addFields({name: "Rating:", value: "10/10", inline: true})
            .addFields({name: "Difficulty:", value: "Medium", inline: true})
            .addFields({name: "Notes:", value: `
            Go into the corner, and line up the top right of the flash icon with the bottom right corner of the electrical box
            `, inline: false})
            .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjEyMzYzOTg2YzZkMTUzYTI3OGZjZWRlYjcyMDc5NzAwZTM5YWNkNCZjdD1n/nuyOOQleX01Pl9Lxtk/giphy-downsized-large.gif`)
            .setTimestamp()
            .setFooter({ text: "ID: 02004", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
            message.channel.send({embeds: [embed3]})
      
  } else if(args[0] === '02005' && !args[1]){ // Knife A main from Stairs
    const embed4 = new EmbedBuilder()
    .setColor(kayoColour)
            .setAuthor({ name: 'Knife A Main from Stairs', iconURL: kayoKnifeIcon})
            .setThumbnail('https://cdn.discordapp.com/attachments/1086176823181840384/1086177537903820861/Screenshot_1050.png')
            .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
            .addFields({name: "Rating:", value: "10/10", inline: true})
            .addFields({name: "Difficulty:", value: "Medium", inline: true})
            .addFields({name: "Notes:", value: `
            stand next to the different colour brick in the wall\nline up the swiggly line of right hud to top left corner of the box
            `, inline: false})
            .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBjMjg3OTM5OGJmNzc3ZTc4MTAxNGVhZGMzYTFkZDBkMmUxYzUxYSZjdD1n/LADPIxZTJPkVbLAqXM/giphy-downsized-large.gif`)
            .setTimestamp()
            .setFooter({ text: "ID: 02005", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
            message.channel.send({embeds: [embed4]})
  } else if(args[0] === '02006' && !args[1]){ // knife B main from Tree
    const embed = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setAuthor({ name: 'Knife B Main from Tree', iconURL: kayoKnifeIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086176823181840384/1086179410287284294/Screenshot_1051.png?width=2428&height=1366')
                      .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "10/10", inline: true})
                      .addFields({name: "Difficulty:", value: "medium", inline: true})
                      .addFields({name: "Notes:", value: `
                      Stand in the corner in tree\nline up the top left tip of kayo icon to top right side of lamp
                      `, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWVlNTYyYThhY2E3MDk2NzMxMTQ4OGFjNTUzNzY2ZDhkNGU3OTBkYSZjdD1n/kq9X0tcFY1QlAEsm5s/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02006", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      message.channel.send({embeds:[embed]})
  } else if(args[0] === '02007' && !args[1]){ // Knife B main from Heaven Box
    const embed2 = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setAuthor({ name: 'Knife B Main from Heaven Box', iconURL: kayoKnifeIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086176823181840384/1086179410287284294/Screenshot_1051.png?width=2428&height=1366')
                      .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "10/10", inline: true})
                      .addFields({name: "Difficulty:", value: "Hard", inline: true})
                      .addFields({name: "Notes:", value: `
                      Go into the corner, and line up your crosshair where the right pole and the gap in tree leaf meets up, then jump and throw the knfie when at maximum height
                      `, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjZjNmMwMzAzNzVkM2QxNWEzZTI2ZDQ5YTk0Mzc4NDM5NGJmODVlMSZjdD1n/Ynyam9lJctMAzbe58b/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02007", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      message.channel.send({embeds:[embed2]})
  } else if(args[0] === '02008' && !args[1]){ // Knife B main from Garden
    const embed3 = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Knife B Main from Garden', iconURL: kayoKnifeIcon})
    .setThumbnail('https://media.discordapp.net/attachments/1086176823181840384/1086179410287284294/Screenshot_1051.png?width=2428&height=1366')
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "10/10", inline: true})
    .addFields({name: "Difficulty:", value: "Medium", inline: true})
    .addFields({name: "Notes:", value: `
     stand next to the small box,\nLine up the left tip of right hud to the top right corner of the window.
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGUzMDRlZDhhOWI5ZGQ0MGQxZmJkZWM0ZWRjNjVlZWM1MGVhYTg4YyZjdD1n/hCGF0rjGYikZkXPqgE/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02008", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({embeds:[embed3]})
    
  } else if(args[0] === '02009' && !args[1]){ // Flash B main
    const embed = new EmbedBuilder()
              .setColor(kayoColour)
              .setAuthor({ name: 'Flash B Main', iconURL: kayoFlashIcon})
              .setThumbnail('https://cdn.discordapp.com/attachments/1086547330553098301/1086547550854725642/Screenshot_1020.png')
              // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
              .addFields({name: "Rating:", value: "9/10", inline: true})
              .addFields({name: "Difficulty:", value: "easy", inline: true})
              .addFields({name: "Notes:", value: `line yourself up in the middle of the wall\nlineup your crosshair to where the 2 points meet`, inline: false})
              .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTU0MzM2MzVlMTIwYWE4Y2Q1YTFkMTA4MDk1M2FjNmM1MzlkYzI5MyZjdD1n/SkF0KoXtc5nzRT80wj/giphy-downsized-large.gif`)
              .setTimestamp()
              .setFooter({ text: "ID: 02009", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
              message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02010' && !args[1]){ // Flash Tiles over throw
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Flash Tiles', iconURL: kayoFlashIcon})
    .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086548787805302784/Screenshot_1026.png?width=2428&height=1366')
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "10/10", inline: true})
    .addFields({name: "Difficulty:", value: "easy", inline: true})
    .addFields({name: "Notes:", value: `line yourself up in the middle of the doors\nlineup your crosshair to the right side of the board`, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFkNjI0Mzc0MjQ5YzVmNWQ0MDZjYTE1NzEzY2JjMzMzMjM4OWFiZCZjdD1n/aUEXkm3js2TE9YszDf/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02010", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02011' && !args[1]){ // Flash Tiles run throw
    const embed2 = new EmbedBuilder()
              .setColor(kayoColour)
              .setAuthor({ name: 'Flash Tiles', iconURL: kayoFlashIcon})
              .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086548787805302784/Screenshot_1026.png?width=2428&height=1366')
              // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
              .addFields({name: "Rating:", value: "10/10", inline: true})
              .addFields({name: "Difficulty:", value: "easy", inline: true})
              .addFields({name: "Notes:", value: `line yourself up with the door knob\nline your crosshair with the top of the edge wall\nrun and throw flash`, inline: false})
              .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDI4MDAzN2MwNWMxNTAzNzdmM2NiY2VlY2U4MGY1NzQyNmQ4MDczNyZjdD1n/DKpwyOkKJRwV8ZMGyW/giphy.gif`)
              .setTimestamp()
              .setFooter({ text: "ID: 02011", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({embeds: [embed2]})
  } else if(args[0] === '02012' && !args[1]){ // Flash for teammate back site
    const embed = new EmbedBuilder()
                  .setColor(kayoColour)
                  .setAuthor({ name: 'Flash for teammate Back Site on B site', iconURL: kayoFlashIcon})
                  .setThumbnail('https://cdn.discordapp.com/attachments/1086547330553098301/1086549216744194128/Screenshot_1027.png')
                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                  .addFields({name: "Rating:", value: "10/10", inline: true})
                  .addFields({name: "Difficulty:", value: "easy", inline: true})
                  .addFields({name: "Notes:", value: `stand anywhere in ct and line up your crosshair to the middle of orange piller, and run a jump throw flash`, inline: false})
                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmYyZmRjZDNkZDFlMTFlZjIyYjZjZmQwOGE0M2VmNzljNjllMjk0YyZjdD1n/IrAQCIPW6MW56fqZFy/giphy-downsized-large.gif`)
                  .setTimestamp()
                  .setFooter({ text: "ID: 02012", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                  message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02013' && !args[1]){ // Flash A main
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Flash A Main', iconURL: kayoFlashIcon})
    .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086549927154421880/Screenshot_1028.png?width=2428&height=1366')
    // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "9/10", inline: true})
    .addFields({name: "Difficulty:", value: "easy", inline: true})
    .addFields({name: "Notes:", value: `go into the corner, and line up your crosshair to bottom of top right line`, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWVmNjgwNzNjYTUzYTY2OTM5YjhlNTYzZTBiMjNjMGJhYTQ3MTRmOSZjdD1n/g7SMwhu2dEHNdS6BSI/giphy.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02013", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02014' && !args[1]){ // Flash Mid for teammate
    const embed = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setAuthor({ name: 'Flash Mid', iconURL: kayoFlashIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086550108465795104/Screenshot_1039.png?width=2428&height=1366')
                      // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "8/10", inline: true})
                      .addFields({name: "Difficulty:", value: "easy", inline: true})
                      .addFields({name: "Notes:", value: `stand in the corner, line up your crosshair with the gap in the roof`, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmJiZGNjMzU2N2EwODYzZGYwZGI4OWZkNWViMmU2ZTAyMWJmYjQzNiZjdD1n/2zoCyT0ae5Yo0xXec0/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02014", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      message.channel.send({embeds:[embed]})
  } else if(args[0] === '02015' && !args[1]){ // Flash mid
    const embed2 = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Flash Mid', iconURL: kayoFlashIcon})
    .setThumbnail('https://media.discordapp.net/attachments/1086547330553098301/1086550108465795104/Screenshot_1039.png?width=2428&height=1366')
    // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "8/10", inline: true})
    .addFields({name: "Difficulty:", value: "easy", inline: true})
    .addFields({name: "Notes:", value: `line yourself with the wall and aim the the top of the roof of building`, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGY5NmViMDVmY2FlM2RmMzU4YmE0MmUzZGFhNGU4OTcwMTdkZTllOCZjdD1n/0NMlnOxRP41JVLmUah/giphy.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02015", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
message.channel.send({embeds:[embed2]})
  } else if(args[0] === '02016' && !args[1]){ // Knife A main/Wine/ Close site
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Knife Close Site & Wine', iconURL: kayoKnifeIcon})
    .setThumbnail('https://media.discordapp.net/attachments/1086542162826633236/1086542281328300082/Screenshot_1042.png?width=2428&height=1366')
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "10/10", inline: true})
    .addFields({name: "Difficulty:", value: "Medium", inline: true})
    .addFields({name: "Notes:", value: `stand next to the edge of the wall,\naim the left tip of the knife icon to the edge of the grey wall`, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDBhMDQyNDZlMWU1YmEzM2EyYmViMGRmZGU5NjdiMTBjOTRjNTk0MSZjdD1n/oCF6HDO5o2wxjgRPZj/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02016", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02017' && !args[1]){ // Knife A site
    const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setAuthor({ name: 'Knife A Site', iconURL: kayoKnifeIcon})
                          .setThumbnail('https://media.discordapp.net/attachments/1086542162826633236/1086543293472583700/Screenshot_1045.png?width=2428&height=1366')
                          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `stand in front of the box, line up the right tip of left hud to the white tip `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2YwOTc5NGRkZGU1MDAzNDA2MDNkMGExYmY4MGU4N2UwYWNkMTM3OCZjdD1n/1X1eLagLbQKlKsmxDZ/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02017", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02018' && !args[1]){ // Knife market from top mid
    const embed = new EmbedBuilder()
                                  .setColor(kayoColour)
                                  .setAuthor({ name: 'Knife Market from Top Mid', iconURL: kayoKnifeIcon})
                                  .setThumbnail('https://media.discordapp.net/attachments/1086542540385308763/1086542671402778674/Screenshot_1046.png?width=2428&height=1366')
                                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                                  .addFields({name: "Rating:", value: "10/10", inline: true})
                                  .addFields({name: "Difficulty:", value: "Medium", inline: true})
                                  .addFields({name: "Notes:", value: `
                                  stand at the edge of the wall,\nline up the middle of left hud with the corner of the wall
                                  `, inline: false})
                                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWRiYzlhNTQ5ZDAxYTBlZWVjNTRmNDFjZjdmYTU0NzIxMGFmYThmZSZjdD1n/2ftD3aaXCUfnahHNKO/giphy-downsized-large.gif`)
                                  .setTimestamp()
                                  .setFooter({ text: "ID: 02018", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                                  message.channel.send({embeds:[embed]})
  } else if(args[0] === '02019' && !args[1]){ // Knife market from tiles
    const embed = new EmbedBuilder()
                                  .setColor(kayoColour)
                                  .setThumbnail('https://media.discordapp.net/attachments/1086542540385308763/1086542671402778674/Screenshot_1046.png?width=2428&height=1366')
                                  .setAuthor({ name: 'Knife Market from Tiles', iconURL: kayoKnifeIcon})
                                  .setThumbnail('https://media.discordapp.net/attachments/1086176823181840384/1086179410287284294/Screenshot_1051.png?width=2428&height=1366')
                                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                                  .addFields({name: "Rating:", value: "10/10", inline: true})
                                  .addFields({name: "Difficulty:", value: "Medium", inline: true})
                                  .addFields({name: "Notes:", value: `
                                  Line yourself up with the corner of the barrier next to the wall,\naim the top left tip of knife icon with the right roof tile
                                  `, inline: false})
                                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODYzYTUzMTdkMjZkMzkxMTA4MTdhOTQ3ZTUyZGZkYzY1ZTU4NmRjMiZjdD1n/vb7hZs39iyAB9hClrB/giphy-downsized-large.gif`)
                                  .setTimestamp()
                                  .setFooter({ text: "ID: 02019", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
message.channel.send({embeds:[embed]})
  } else if(args[0] === '02020' && !args[1]){ // Knife close b main & logs & market
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Knife Close B site & market & logs', iconURL: kayoKnifeIcon})
    .setThumbnail('https://cdn.discordapp.com/attachments/1086542580247957614/1086542829838413844/Screenshot_1047.png')
    // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "8/10", inline: true})
    .addFields({name: "Difficulty:", value: "Easy", inline: true})
    .addFields({name: "Notes:", value: `stand anywhere in tiles and knife through the fence `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGJkMmIxNmYwMWNiYzY0ZjBkNTUxZDQwM2E1YWI0NDk5ODNmNjM5OSZjdD1n/U7qksuVKSbWei3F2mX/giphy.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02020", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02021' && !args[1]){ // Knife B site & Switch
    const embed = new EmbedBuilder()
                          .setColor(kayoColour)
                          .setAuthor({ name: 'Knife B site & switch', iconURL: kayoKnifeIcon})
                          .setThumbnail('https://media.discordapp.net/attachments/1086542580247957614/1086543017843900497/Screenshot_1049.png?width=2428&height=1366')
                          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                          .addFields({name: "Rating:", value: "10/10", inline: true})
                          .addFields({name: "Difficulty:", value: "Easy", inline: true})
                          .addFields({name: "Notes:", value: `stand in the corner\naim your crosshair to the gap in the window `, inline: false})
                          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWFlZmY0NjRlNjFkMmI3MmYyNTI3YTRiYmFlYjNiMjZiODIxNThmZSZjdD1n/bOyQ3OjKt2VnmCWkDH/giphy-downsized-large.gif`)
                          .setTimestamp()
                          .setFooter({ text: "ID: 02021", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                          message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02022' && !args[1]){ // Flash A Site
                                  const embed = new EmbedBuilder()
                                  .setColor(kayoColour)
                                  .setAuthor({ name: 'Flash A Site', iconURL: kayoFlashIcon})
                                  .setThumbnail('https://media.discordapp.net/attachments/1086547287142051850/1086547414279798815/Screenshot_1030.png?width=2428&height=1366')
                                  .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                                  .addFields({name: "Rating:", value: "10/10", inline: true})
                                  .addFields({name: "Difficulty:", value: "Easy", inline: true})
                                  .addFields({name: "Notes:", value: `
                                  stand against the wall\nline the right tip of right hud to the bottom of the top left light blub
                                  `, inline: false})
                                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I0YWI4NDI4ZDcwM2MyNjVlNDFjMzE3ZTU5MGJiYjY0MWIzYzZkNyZjdD1n/GTd0QuLURTtiGYsAx8/giphy-downsized-large.gif`)
                                  .setTimestamp()
                                  .setFooter({ text: "ID: 02022", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                                  message.channel.send({embeds:[embed]})
  } else if(args[0] === '02023' && !args[1]){ // Flash A Site
    const embed2 = new EmbedBuilder()
                                  .setColor(kayoColour)
                                  .setThumbnail('https://media.discordapp.net/attachments/1086547287142051850/1086547414279798815/Screenshot_1030.png?width=2428&height=1366')
                                  .setAuthor({ name: 'Flash A Site', iconURL: kayoFlashIcon})
                                  // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                                  .addFields({name: "Rating:", value: "10/10", inline: true})
                                  .addFields({name: "Difficulty:", value: "Easy", inline: true})
                                  .addFields({name: "Notes:", value: `
                                  stand anywhere along the wall\naim your crosshair to the first bump of the cloud
                                  `, inline: false})
                                  .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2U0YzVmMGQxNWYwZmY3NTUwNzQ3YmI2NGQwODk5ZWEyNWM1MzJjMiZjdD1n/2kuDPiy8OJ0DSeRDiv/giphy-downsized-large.gif`)
                                  .setTimestamp()
                                  .setFooter({ text: "ID: 02023", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
message.channel.send({embeds:[embed2]})
  } else if(args[0] === '02024' && !args[1]){ // Flash B site Anti Retake
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Flash Anti Retake', iconURL: kayoFlashIcon})
    .setThumbnail('https://cdn.discordapp.com/attachments/1086547287142051850/1086547687534514186/Screenshot_1022.png')
    // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "4/10", inline: true})
    .addFields({name: "Difficulty:", value: "Easy", inline: true})
    .addFields({name: "Notes:", value: `
    stand on the ledge of lane\naim at the tip of roof
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTFlYzc1MjVjZTc0MGIwOGU1MjI4MTU5NTMzYWE5N2Y0NTNmNjFkNCZjdD1n/4aauOEUoN6KhogxkbH/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02024", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})     
  } else if(args[0] === '02025' && !args[1]){ // Flash Heaven
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Flash Heaven', iconURL: kayoFlashIcon})
    .setThumbnail('https://cdn.discordapp.com/attachments/1086547287142051850/1086548328126361761/Screenshot_1025.png')
    // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "10/10", inline: true})
    .addFields({name: "Difficulty:", value: "Easy", inline: true})
    .addFields({name: "Notes:", value: `
    stand anywhere along the wall\naim anywhere on the tip of the window
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjdmOWYyZWM0MzFkZGNjNjk5ZWZmNDBhYmJhZWE5YjhiODMyZDkxYyZjdD1n/b3VmSU1DLBi44XX9F2/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02025", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02026' && !args[1]){ // Flash A site toward generator
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Flash A site Toward Generator', iconURL: kayoFlashIcon})
    .setThumbnail('https://media.discordapp.net/attachments/1086547287142051850/1086549462207438899/Screenshot_1037.png?width=2428&height=1366')
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "10/10", inline: true})
    .addFields({name: "Difficulty:", value: "Easy", inline: true})
    .addFields({name: "Notes:", value: `
    stand in the corner\naim your crosshair below the gap in the cloud
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWQyNDQ5OWZjZTc4NWZiZTVhOTg2YWEwNDNiYmE3MjcxYTFmZTRjMSZjdD1n/HOIgYPU01rl9zl0lIL/giphy.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02026", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02027' && !args[1]){ // Flash Tree
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Flash Tree', iconURL: kayoFlashIcon})
    .setThumbnail('https://cdn.discordapp.com/attachments/1086547287142051850/1086551335392002048/Screenshot_1053.png')
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "10/10", inline: true})
    .addFields({name: "Difficulty:", value: "Medium", inline: true})
    .addFields({name: "Notes:", value: `
    stand in the corner\naim your crosshair slightly to the right of the first line and run and throw flash
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGE1YTcyMzQyNzExYjNiNWUwMDMwOWRkM2JjMmU1OTg2NzA2ZDkzOSZjdD1n/fTASUmngwJ5ba7MNWP/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02027", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02028' && !args[1]){ // Flash A main Peak
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Flash A Main ', iconURL: kayoFlashIcon})
    .setThumbnail('https://cdn.discordapp.com/attachments/1086547287142051850/1086551422675460146/Screenshot_1054.png')
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "10/10", inline: true})
    .addFields({name: "Difficulty:", value: "Easy", inline: true})
    .addFields({name: "Notes:", value: `
    stand at the edge of the wall\naim your crosshair to the corner of the roof tile
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDZhOTk2Y2Y1MWJjN2U0YjU5NjAxYTY1MDg5MThiYmJhNDAwZGE3ZSZjdD1n/tpOlqpKcYsEkf02CDK/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02028", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})    
  } else if(args[0] === '02029' && !args[1]){ // Molly Stairs
    const embed = new EmbedBuilder()
                      .setColor(kayoColour)
                      .setAuthor({ name: 'Molly Stairs', iconURL: kayoMollyIcon})
                      .setThumbnail('https://media.discordapp.net/attachments/1086544228194197635/1086545301470466129/Screenshot_1059.png?width=2428&height=1366')
                      .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
                      .addFields({name: "Rating:", value: "8/10", inline: true})
                      .addFields({name: "Difficulty:", value: "Hard", inline: true})
                      .addFields({name: "Notes:", value: `
                      stand in the corner\nline up your crosshair to where the to points meet, then jump and throw molly
                      `, inline: false})
                      .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjc4NTAwZDQ0MWUzYzcyY2U5OWI1OWM3NmFkZDg3NDcyMWZmZDYwNiZjdD1n/NzPYFewPp2yUTH7QmP/giphy-downsized-large.gif`)
                      .setTimestamp()
                      .setFooter({ text: "ID: 02029", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
                      message.channel.send({ embeds: [embed]})    
  } else if(args[0] === '02030' && !args[1]){ // moly CT
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Molly ct', iconURL: kayoMollyIcon})
    .setThumbnail('https://cdn.discordapp.com/attachments/1086544228194197635/1086545396924428348/Screenshot_1060.png')
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "6/10", inline: true})
    .addFields({name: "Difficulty:", value: "Hard", inline: true})
    .addFields({name: "Notes:", value: `
    stand in the corner\nline up your crosshair slightly to the right on the tower, then jump and throw molly
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDkwMjY5NWM5MDJmYzg2NDA2NDBmMmMxZmVhNDMwY2ExMmZiZmUzNSZjdD1n/4yybkbVKs9YdHEvYW7/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02030", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({ embeds: [embed]})      
  } else if(args[0] === '02031' && !args[1]){ // molly heaven
    const embed = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Molly Heaven', iconURL: kayoMollyIcon})
    .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086544382502637658/Screenshot_1034.png?width=2428&height=1366')
    // .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "8/10", inline: true})
    .addFields({name: "Difficulty:", value: "Hard", inline: true})
    .addFields({name: "Notes:", value: `
    stand in the corner\nline up your crosshair with the white tip and jump throw
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTk2NWZhZWNlYTgzN2Q3YzkwMjg4MmE4NzNmODdhMTI2ZDUyOTVjOSZjdD1n/WLBeMA8oCID43dQQmE/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02031", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
     
    message.channel.send({embeds:[embed]})
  } else if(args[0] === '02032' && !args[1]){ // Molly Heaven
    const embed2 = new EmbedBuilder()
    .setColor(kayoColour)
    .setAuthor({ name: 'Molly Heaven', iconURL: kayoMollyIcon})
    .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086544382502637658/Screenshot_1034.png?width=2428&height=1366')
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: "8/10", inline: true})
    .addFields({name: "Difficulty:", value: "Hard", inline: true})
    .addFields({name: "Notes:", value: `
    stand next to the wall\nline up your the left hud of your ult icon with the top left of lamp bracket
    `, inline: false})
    .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjg2NTUwOTgyNzBjNTM5MThhNDE1ZDEwOTg5ODJlYjg4OTM3MjhlZiZjdD1n/uocYjmI0EOvlHs9pPG/giphy-downsized-large.gif`)
    .setTimestamp()
    .setFooter({ text: "ID: 02032", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
    message.channel.send({embeds:[embed2]})

  } else if(args[0] === '02033' && !args[1]){ // Molly Dice
    const embed = new EmbedBuilder()
              .setColor(kayoColour)
              .setAuthor({ name: 'Molly Dice', iconURL: kayoMollyIcon})
              .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086544576975740978/Screenshot_1035.png?width=2428&height=1366')
              .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
              .addFields({name: "Rating:", value: "10/10", inline: true})
              .addFields({name: "Difficulty:", value: "Easy", inline: true})
              .addFields({name: "Notes:", value: `
              stand in the corner\nline up your left hud underneath the wooden piece and 4 bricks to the right
              `, inline: false})
              .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDIyZTg4ZDE2Y2VjMzhiNmU2NDdhNmNlMzMxNjY2OTZjZmI3NDYyMyZjdD1n/cHIZSL5aHBcA6xasio/giphy-downsized-large.gif`)
              .setTimestamp()
              .setFooter({ text: "ID: 02033", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
              message.channel.send({ embeds: [embed]})   
  } else if(args[0] === '02034' && !args[1]){ // Molly Tree
    const embed = new EmbedBuilder()
          .setColor(kayoColour)
          .setAuthor({ name: 'Molly Tree', iconURL: kayoMollyIcon})
          .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086544834002681876/Screenshot_1058.png?width=2428&height=1366')
          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
          .addFields({name: "Rating:", value: "10/10", inline: true})
          .addFields({name: "Difficulty:", value: "Hard", inline: true})
          .addFields({name: "Notes:", value: `
          stand against the edge of the wall\nline up your crosshair with second line, and jump and then throw molly
          `, inline: false})
          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTcyODVkYTk1MmQ5ZTUyNDVhMjQ1NDZmNjljZDcxOGM4MzY5ZDZhNCZjdD1n/YJHOtP2qA4jUXhDNzn/giphy-downsized-large.gif`)
          .setTimestamp()
          .setFooter({ text: "ID: 02034", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
          message.channel.send({ embeds: [embed]})    
          
  } else if(args[0] === '02035' && !args[1]){ // molly gen

    const embed = new EmbedBuilder()
          .setColor(kayoColour)
          .setAuthor({ name: 'Molly Generator', iconURL: kayoMollyIcon})
          .setThumbnail('https://media.discordapp.net/attachments/1086544182413381662/1086545983678201886/Screenshot_1036.png?width=2428&height=1366')
          .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
          .addFields({name: "Rating:", value: "10/10", inline: true})
          .addFields({name: "Difficulty:", value: "Medium", inline: true})
          .addFields({name: "Notes:", value: `
          stand in the corner\nline up the right tip of right hud to the top left of the box
          `, inline: false})
          .setImage(`https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzY3ZjQxODM0YjQyM2M1ZWRjMTMyMTg0NjRiYzZhNmZhNmNmNTUzOCZjdD1n/Utec1UcqnIL9fTkRGo/giphy-downsized-large.gif`)
          .setTimestamp()
          .setFooter({ text: "ID: 02035", iconURL: 'https://static.wikia.nocookie.net/valorant/images/f/f0/KAYO_icon.png/revision/latest?cb=20210622225019'})
          message.channel.send({ embeds: [embed]})    
  } else if(args[0] === '03000' && !args[1]){ // orb rafters
    const embed = new EmbedBuilder()
    .setColor(viperColour)
    .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
    .setAuthor({ name: 'Orb Mid', iconURL: viperOrbIcon})
    .setThumbnail(thumb03001)
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: rating03001, inline: true})
    .addFields({name: "Difficulty:", value: difficulty03001, inline: true})
    .addFields({name: "Notes:", value: notes03001, inline: false})
    .setImage(gif03001)
    .setTimestamp()
    .setFooter({ text: "ID: 03001", iconURL: viperIcon})
    message.channel.send({ embeds: [embed]})     
  } else if(args[0] === '03001' && !args[1]){ // orb mid
    const embed = new EmbedBuilder()
    .setColor(viperColour)
    .setDescription("`" + prefixDisplay + "video LINEUP_ID` - to display a 1080p mp4 video\nLineup ID can be found in bottom left hand corner")
    .setAuthor({ name: 'Orb Mid', iconURL: viperOrbIcon})
    .setThumbnail(thumb03001)
    .addFields({name: "<:VCT:1088973066039730238> VCT CERTIFIED", value: " ", inline: true})
    .addFields({name: "Rating:", value: rating03001, inline: true})
    .addFields({name: "Difficulty:", value: difficulty03001, inline: true})
    .addFields({name: "Notes:", value: notes03001, inline: false})
    .setImage(gif03001)
    .setTimestamp()
    .setFooter({ text: "ID: 03001", iconURL: viperIcon})
    message.channel.send({ embeds: [embed]})     
  }
            
              
   
    else {
    message.channel.send(`Use ${prefixDisplay}lineup **lineup ID** to quick search a lineup`)
  }
      
    break;

    case 'video':
    case 'vid':



    function videoID(idOne, idTwo){
      message.channel.send(`MP4 Video for ID: ${idOne}\n${idTwo}`)
    }

      if(args[0] === '02000') videoID('02000', video02000) // Molly retake killjoy ult
      if(args[0] === '02001') videoID('02001', video02001) // Molly killjoy b site ult
      if(args[0] === '02002') videoID('02002', video02002) // Knife A main from Garden
      if(args[0] === '02003') videoID('02003', video02003) // Knife A main from Heaven Hall
      if(args[0] === '02004') videoID('02004', video02004) // Knife A main from B Site
      if(args[0] === '02005') videoID('02005', video02005) // Knife A main from Stairs
      if(args[0] === '02006') videoID('02006', video02006) // knife B main from Tree
      if(args[0] === '02007') videoID('02007', video02007) // Knife B main from Heaven Box
      if(args[0] === '02008') videoID('02008', video02008) // Knife B main from Garden
      if(args[0] === '02009') videoID('02009', video02009) // Flash B main
      if(args[0] === '02010') videoID('02010', video02010) // Flash Tiles Over Throw
      if(args[0] === '02011') videoID('02011', video02011) // Flash Tiles run throw
      if(args[0] === '02012') videoID('02012', video02012) // Flash for teammate back site
      if(args[0] === '02013') videoID('02013', video02013) // Flash A main
      if(args[0] === '02014') videoID('02014', video02014) // Flash Mid for teammate
      if(args[0] === '02015') videoID('02015', video02015) // Flash mid
      if(args[0] === '02016') videoID('02016', video02016) // Knife A main/Wine/ Close site
      if(args[0] === '02017') videoID('02017', video02017) // Knife A site
      if(args[0] === '02018') videoID('02018', video02018) // Knife market from top mid
      if(args[0] === '02019') videoID('02019', video02019) // Knife market from tiles
      if(args[0] === '02020') videoID('02020', video02020) // Knife close b main & logs & market
      if(args[0] === '02021') videoID('02021', video02021) // Knife B site & Switch
      if(args[0] === '02022') videoID('02022', video02022) // Flash A site
      if(args[0] === '02023') videoID('02023', video02023) // Flash A site
      if(args[0] === '02024') videoID('02024', video02024) // Flash B site anti Retake
      if(args[0] === '02025') videoID('02025', video02025) // Flash Heaven
      if(args[0] === '02026') videoID('02026', video02026) // Flash A site towards Generator
      if(args[0] === '02027') videoID('02027', video02027) // Flash tree
      if(args[0] === '02028') videoID('02028', video02028) // Flash A main peak
      if(args[0] === '02029') videoID('02029', video02029) // Molly Stairs
      if(args[0] === '02030') videoID('02030', video02030) // Molly CT
      if(args[0] === '02031') videoID('02031', video02031) // Molly Heaven
      if(args[0] === '02032') videoID('02032', video02032) // Molly Heaven
      if(args[0] === '02033') videoID('02033', video02033) // Molly Dice
      if(args[0] === '02034') videoID('02034', video02034) // Molly Tree
      if(args[0] === '02035') videoID('02035', video02035) // Molly Gen

      if(args[0] === '03000') videoID('03000', video03000) //  Orb Rafters
      if(args[0] === '03001') videoID('03001', video03001) //  Orb mid

      break;


}
});

client.login(TOKEN);
