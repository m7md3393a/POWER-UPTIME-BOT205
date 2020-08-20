module.exports={
	name:'botekle',
	aliases:[],
	cooldown:360,
	execute(message,args){
    const Discord=require("discord.js");
		const db=require("quick.db")
    if(!args[0])return message.channel.send(new Discord.MessageEmbed().setAuthor('Uyarı').setDescription(":no_entry: Proje adı gir.").setColor('RANDOM'));
    if(args[0].startsWith("http://")||args[0].startsWith("https://")||args[0].includes(".")||args[0].includes("/"))return message.reply("Url ekleyemessin.");
    if(db.get("uptime").includes(args[0]+" "+message.author.id))return message.reply("Bu proje zaten ekli.")
    db.push("uptime",args[0]+" "+message.author.id);
    message.reply(args[0]+" Eklendi!");
    message.client.channels.cache.get("741202677295349841").send(`${message.client.guilds.cache.get("677938232142331935").member(message.author)||message.author.tag} `+args[0]+" Adlı Projeyi Ekledi.");
	}
};