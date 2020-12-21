onst Discord = require("discord.js");
const setting = require("quick.db");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  const setting = await db.fetch(`snipe.id.${message.guild.id}`);
  if (!setting) {
    const help1 = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(`Message not found!`)
      .setColor(`BLACK`);
    message.channel.send(help1);
  } else {
    let user = client.users.cache.get(setting);
    const bot = await db.fetch(`snipe.mesaj.${message.guild.id}`);
    const help = new Discord.MessageEmbed()
      .setAuthor(user.username, user.avatarURL())
      .setDescription(`Deleted message: ` + bot)
      .setColor(`BLACK`);
    message.channel.send(help);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["snipe"],
  permLevel: 0
};

exports.help = {
  name: "snipe",
  description: "Displays the recently deleted message.",
  usage: "snipe"
};
