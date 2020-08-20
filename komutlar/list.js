module.exports={
	name:'list',
	aliases:[],
	execute(message,args){
    const Discord=require("discord.js");
    const db=require("quick.db");
    var projects=db.fetch("uptime").filter(a=>a.split(" ")[1]==message.author.id).map(a=>a.split(" ")[0]).join("\n");
		message.channel.send(new Discord.MessageEmbed().setTitle('Uptime olan projelerin').setAuthor(message.author.username,message.author.displayAvatarURL({dynamic:true})).setDescription(projects==""?"Projen yok":projects).setColor('RANDOM'))
	}
};