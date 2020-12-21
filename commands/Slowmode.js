const db = require("quick.db");
const Discord = require("discord.js");
const request = require("request");
const ayarlar = require("../settings.json");
exports.run = async (client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = "!";

  if (!message.member.hasPermission("ADMINISTRATOR")) 
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          `•\`${prefix}slowmode\` You must have , \`Admin\` **Authority to use**.`
        )
    );
    if (message.channel.type !== "text") return;
    const limit = args[0] ? args[0] : 0;
    if (!limit) {
      var EmbedİSTAN = new Discord.MessageEmbed()
        .setDescription(`**Use ${prefix}slowmode [1-480]**`)
        .setColor("RED");
      message.channel.send(EmbedİSTAN);
      return;
    }
    if (limit > 480) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setDescription(
            `**Time Limit Can Be Maximum** __480__ **Seconds**`
          )
          .setColor("RED")
      );
    }
    message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `**Write Time Limit Set to** __${limit}__ **Seconds**`
        )
        .setColor("GREEN")
    );
    var request = require("request");
    request({
      url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
      method: "PATCH",
      json: {
        rate_limit_per_user: limit
      },
      headers: {
        Authorization: `Bot ${client.token}`
      }
    });
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode"],
  permLevel: 0
};

exports.help = {
  name: "slowmode",
  description: "Slow Mode System",
  usage: "slowmode"
  };
