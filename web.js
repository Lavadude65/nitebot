const Discord = require("discord.js")
const bot = new Discord.Client({disableEveryone: true})
const superagent = require("superagent")
const ms = require("ms")

bot.on("ready", async () => {
    console.log(`${bot.user.username} is Online, No Errors Found on Run!`)
    bot.user.setActivity(`Serving ${bot.users.size} Users at NitePVP`, {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    const prefix = '$';
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
	const args = messageArray.slice(1);
	
if(cmd === `${prefix}Commands`) {
const CMDEmbed = new Discord.RichEmbed()
	.setColor('#17F402')
	.setTitle('Commands List')
	.setURL('https://github.com/nitedevs/NiteBot')
	.setAuthor('NiteBot', 'https://cdn.discordapp.com/avatars/578159422292099072/02a28269ebbd01c8c4d96596272a0e4c.png?size=256', 'https://github.com/nitedevs/NiteBot')
	.setDescription('Bot Prefix is : $')
	.setThumbnail('https://cdn.discordapp.com/avatars/578159422292099072/02a28269ebbd01c8c4d96596272a0e4c.png?size=256')
	.addField('**Purge**', '<2 - 100>* , *Deletes number of messages, numbers between 2 and 100*', true)
	.addField('**server-vote**', '*Gets a page to vote for the server*', true)
	.addField('**store**', '*shows link to the NitePVP Server Store*', true)
	.addField('**say**', '*say <Word>, makes bot say a word instead of you*', true)
	.setTimestamp()
  .setFooter(message.author.tag, message.author.avatarURL);
    message.channel.send(CMDEmbed)
}

if(cmd === `${prefix}cat`) {
	let msg = await message.channel.send("*Fetching Cat Pictures.....*")
	let {body} = await superagent
	if(!{body}) return message.channel.send("Cannot Fetch Now, Please Try Again Later!")
	.get(`http://aws.random.cat/meow`)
	//console.log(body.file)
	let CatFetcher = new Discord.RichEmbed()
	.setColor("#17F402")
	.setAuthor(`NiteBot`)
	.setImage(body.file)
	.setTimestamp()
	.setFooter(message.author.username.name, message.author.avatarURL)
}
if(cmd === `${prefix}say`) {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

if(cmd === `${prefix}report`) {

let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!rUser) return message.channel.send("Error 404 : Couldn't Find User")
let reportReason = args.join(" ").slice(22);
if(!reportReason) return message.channel.send("Error 404 : You Didn't Mention a Reason To Report The User!")

const ReportEmbed = new Discord.RichEmbed()
.setTitle("User Reported!")
.setDescription(`Report Made by ${message.author.tag}`)
.setColor("#E50005")
.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Attention_Sign.svg/1169px-Attention_Sign.svg.png")
.addField("Reported By :", `${message.author.tag}`, true)
.addField("Reported User :", `${rUser} | ${rUser.id}`, true)
.addField("Reported In Channel :", `${message.channel.name}`, true)
.addField("Reason :", `${reportReason}`, true)
.setTimestamp()
.setFooter("NiteBot")


let reportChannel = message.guild.channels.find(x => x.name === "reports");
if(!reportChannel) return message.channel.send("Reporting Channel not found! please make a Channel Called \"reports\" ")

reportChannel.send(ReportEmbed)
	return;
}


if(cmd === `${prefix}server-user-count`) {
	const userTotalCount = bot.users.size
	const EmbedTotal = new Discord.RichEmbed()
	.setTitle("Total Server User Count")
	.setDescription(`Total Count is down here!`)
	.setColor("#169245")
	.addField("Total User Count", `${userTotalCount}`, true)
	.setTimestamp()
	.setFooter("NitePVP")
	message.channel.send(EmbedTotal);
}


  if(cmd=== `${prefix}purge`) {

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
	  return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
	  
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	}
	if(cmd === `${prefix}mute`) {
	if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return 
		const msgCaller = message.author
		const err1Embed = new Discord.RichEmbed()
	.setTitle("Missing Permissions!")
	.setDescription("User doesn't have Permissions to run this command! see required permissions below!")
	.setColor("#E50005")
	.addField("Message Caller : ", `${msgCaller.tag} | ${msgCaller.id}`, true)
	.addField("Missing Permissions :" `MANAGE_ROLES`, true)
	.setTimestamp()
	.setFooter(`${bot.user.username}`)
	message.channel.send(err1Embed)


	if(!message.guild.me.hasPermission(["MANAGE_ROLES, ADMINISTRATOR"])) return
	const err2Embed = new Discord.RichEmbed()
	.setTitle("Missing Permissions!")
	.setDescription("Bot Has Missing Permissions! Required Permissions Below!")
	.addField("Permissions :", "MANAGE_ROLES, ADMINISTRATOR", true)

	let mutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!mutedUser) return
	const err3Embed = new Discord.RichEmbed()
	.setTitle("Syntax Error!")
	.setDescription("You Didn't Mention a User to Mute! Syntax : `mute <member> <reason>` ")
	.setColor("#E50005")
	.setTimestamp()
	.setFooter(`${bot.user.username}`)
	message.channel.send(err3Embed);

	let reason = args.slice(1).join(" ");
	if(!reason) reason = "No reason given"
	
	let Moderator = message.author
	let mutedChannel = message.guild.channels.find(x => x.name === "moderator-logs");

	let mutedRole = message.guild.find(r => r.name === "Muted")
	if(!mutedRole) {
		try{
			mutedRole = await message.guild.createRole({
				name: "Muted",
				color: "#E50005",
				permissions: []
			})
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(mutedRole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false,
					SEND_TTS_MESSAGES: false,
					ATTACH_FILES: false,
					SPEAK: false
				})
			})
		} catch(e) {
			console.log(e.stack);
		}
	}
	mutedUser.addRole(mutedRole.id).then(() => {
		message.delete()
		mutedUser.send(`hello, you have been muted in ${message.guild.name} due to ${reason}`)
		const MuteEmbed = new Discord.RichEmbed()
		.setTitle("User Successfully Muted!")
		.setDescription("User Has Been Successfully Muted! Info Below!")
		.setColor("#E50005")
		.setThumbail("http://www.clker.com/cliparts/8/9/4/9/1240848155298205944thatsmyboy_Simple_Red_Checkmark.svg.med.png")
		.addField("Moderator :", `${Moderator.user.username} | ${Moderator.id}`, true)
		.addField("Muted User :", `${mutedUser}`, true)
		.setTimestamp()
		.setFooter(`${bot.user.username}`)
		message.channel.send(MuteEmbed)
   
	})
	}

	if(cmd=== `${prefix}bulkpurge`) {

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
	  return message.reply("Please provide a number between 200 and 1000 for the number of messages to delete");
	  
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	}


})



bot.login("secret_token");
