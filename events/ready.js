const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../settings.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Online, Loaded Commands!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } Login with name!`
  );
  client.user.setStatus("online");
  client.user.setActivity("Aspecth Coding 7/24");
};
