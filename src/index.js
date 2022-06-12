"use strict";
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var dotenv = require("dotenv");
dotenv.config();
var CONFIG = process.env;
var TOKEN = process.env.TOKEN;
console.log('TOKEN: ', TOKEN);
if (!TOKEN)
    throw new Error('You should set bot token!');
var bot = new telegraf_1.Telegraf(TOKEN);
bot.on('text', function (ctx) {
    console.log('ctx: ', ctx);
    ctx.telegram.sendMessage(ctx.message.chat.id, "Hello ".concat(ctx.state.role));
    ctx.reply("Hello ".concat(ctx.state.role));
});
console.log('start');
bot.launch();
