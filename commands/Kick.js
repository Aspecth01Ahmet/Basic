const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async function(client, message, args) {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = "!";
  
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField(
          "Hata",
         `•\`${prefix}kick\` You must have , \`Admin\` **Authority to use**.`
        )
        
    );
    return;
  }
  const logChID = await db.fetch(`logKanal_${message.guild.id}`);
  const channel = message.guild.channels.cache.get(logChID);
  const kisi =
    message.mentions.members.first() ||
    message.guild.members.cache.find(a => a.id == args[0]);
  const reason = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  var reasonss;
  if (reason == "") reasonss = "Yok";
  if (reason != "") reasonss = reason;
  if (!kisi) {
    const embed = new Discord.MessageEmbed()
      .setColor("#0AFF00")
      .setDescription(`Specify a person.`)
      .setFooter(
        `${client.user.username} Kick  system.`,
        message.guild.iconURL({ dynamic: true })
      )
      .setTimestamp();
    message.channel.send(embed).then(a => a.delete({ timeout: 10000 }));
    return;
  }

  if (kisi.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        `${kisi} He wasn't kicked off the server because I couldn't assign someone in charge.`
      )
      .setFooter(
        `${client.user.username} Kick  system.`,
        message.guild.iconURL({ dynamic: true })
      )
      .setTimestamp();
    message.channel.send(embed).then(a => a.delete({ timeout: 10000 }));
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setFooter(
        `${client.user.username} Kick  system.`,
        message.guild.iconURL({ dynamic: true })
      )
      .addField("Discarded:", kisi.user.tag)
      .addField("Personel:", message.author.tag)
      .addField("Seosen:", reasonss)
      .setTimestamp();
    message.channel.send(embed).then(a => a.delete({ timeout: 10000 }));
    kisi.kick();
    if (channel) {
      const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setFooter(
          `${client.user.username} Ban  sistemi.`,
          message.guild.iconURL({ dynamic: true })
        )
        .addField("Discarded:", kisi.user.tag)
        .addField("Personel:", message.author.tag)
        .addField("Seosen:", reasonss)
        .setTimestamp();
      channel.send(embed);
    } else return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kick"],
  permLevel: 0
};

exports.help = {
  name: "kick",
  description: "You're Throwing Someone Out.",
  usage: "kick"
};
