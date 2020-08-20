const Discord=require("discord.js");
const db=require("quick.db");
const fs = require('fs');
const client=new Discord.Client();
require("express")().listen(3000);
client.on("ready",()=>{
  if(!db.get("uptime"))db.set("uptime",[])
  console.log("Started! "+client.user.tag);
  var uptime=a=>require("request").defaults({headers:{'User-Agent':require('random-useragent').getRandom()}}).get("https://"+a.split(" ")[0]+".glitch.me/");
  client.user.setPresence({status:"idle",activity:{name:"u!yardım"}})
  const a=client.channels.cache.get("742816952975753248"); ///bildirim gidecek kanal
  if(!a)return;
  a.send("<a:golduye:719863435470438422>  Tüm projeler güncellendi!");
  setInterval(()=>{try{db.fetch("uptime").forEach(uptime)}catch{};a.send("<a:golduye:719863435470438422> Tüm projeler güncellendi!");},60000);
});
const cooldowns=new Discord.Collection();
client.on("message",message=>{
  if(!message.content.startsWith("u!"))return;
  const args=message.content.slice("u!".length).trim().split(/ +/);
  const commandName=args.shift().toLowerCase();
  if(!client.commands.has(commandName)) return;
  const command=client.commands.get(commandName);
  if (!cooldowns.has(command.name)) {
	  cooldowns.set(command.name,new Discord.Collection());
  }
  const now=Date.now();
  const timestamps=cooldowns.get(command.name);
  const cooldownAmount=(command.cooldown||5)*1000;
  if(timestamps.has(message.author.id)){
    const expirationTime=timestamps.get(message.author.id)+cooldownAmount;
	  if (now<expirationTime) {
		  const timeLeft=(expirationTime-now)/1000;
		  return message.reply(`Bu komutu ${timeLeft.toFixed(1)} saniye sonra kullanabilirsin.`);
	  }
	}
  var owner=["690614028979929149","551487158934962176"];
  if(!owner.includes(message.author.id))timestamps.set(message.author.id,now);
  if(!owner.includes(message.author.id))setTimeout(()=>timestamps.delete(message.author.id),cooldownAmount);
  try{
    command.execute(message,args);
  }catch(e){console.log(e)}
});

client.commands=new Discord.Collection();
const commandFiles=fs.readdirSync('./komutlar').filter(file=>file.endsWith('.js'));
for(const file of commandFiles){const command=require(`./komutlar/${file}`);client.commands.set(command.name,command);}
client.login("UPTİMEBOTUNUZUNTOKENİ");