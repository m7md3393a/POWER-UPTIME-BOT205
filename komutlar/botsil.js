module.exports={
	name:'botsil',
	aliases:[],
	cooldown:360,
	execute(message,args){
    const Discord=require("discord.js");
		const db=require("quick.db")
    if(!args[0])return message.channel.send(new Discord.MessageEmbed().setAuthor('Uyarı').setDescription(":no_entry: Proje adı gir.").setColor('RANDOM'));
    if(!db.get("uptime").includes(args[0]+" "+message.author.id))return message.reply("Bu proje yok")
    db.set("uptime",db.get("uptime").filter(a=>a!=args[0]+" "+message.author.id));
    message.reply(args[0]+" Silindi!");
   }
};