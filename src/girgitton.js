import TelegramBot from 'node-telegram-bot-api'

import config from './config.js'

const bot = new TelegramBot(config.TOKEN, { polling: true })

bot.on('text',  (msg) => {

    if(config.textRegExr.test(msg.text)){
        bot.deleteMessage(msg.chat.id, msg.message_id)
        .catch( error => {
            error = error.toJSON()
            if(error.message === "ETELEGRAM: 400 Bad Request: message can't be deleted"){
                bot.sendMessage(msg.chat.id, "<i>Guruhda bot ishlashi uchun botga adminlik huquqining bering!</i>", {parse_mode : 'HTML'})
            }
        }) 
    }
    else if(msg.from.first_name === 'Channel' || msg?.entities || msg.new_chat_member || msg.left_chat_member){
        bot.deleteMessage(msg.chat.id, msg.message_id)
        .catch( error => {
            error = error.toJSON()
            if(error.message === "ETELEGRAM: 400 Bad Request: message can't be deleted"){
                bot.sendMessage(msg.chat.id, "<i>Guruhda bot ishlashi uchun botga adminlik huquqining bering!</i>", {parse_mode : 'HTML'})
            }
        }) 
    }

})

bot.on('message', (msg) => {

    if(msg.from.first_name === 'Channel' || msg?.entities || msg.new_chat_member || msg.left_chat_member){
        bot.deleteMessage(msg.chat.id, msg.message_id)
        .catch( error => {
            error = error.toJSON()
            if(error.message === "ETELEGRAM: 400 Bad Request: message can't be deleted"){
                bot.sendMessage(msg.chat.id, "<i>Guruhda bot ishlashi uchun botga adminlik huquqining bering!</i>", {parse_mode : 'HTML'})
            }
        }) 
    }
})

bot.on('chat_member', (msg) => {
    console.log('chat_member', msg)
})

bot.on('my_chat_member', (msg) => {

    if(msg?.new_chat_member?.user.username === 'girgittonkabot' && msg?.new_chat_member.status === 'administrator'){
        bot.sendMessage(msg.chat.id,"<b>Bot ishga tushdi!</b>", { parse_mode: 'HTML', disable_notification: true })
    }
    else if(msg?.new_chat_member?.user.username === 'girgittonkabot' && msg?.new_chat_member.status === 'member'){
        bot.sendMessage(msg.chat.id,"<b>Bot funksiyalari o'chirildi!</b>", { parse_mode: 'HTML', disable_notification: true })
    }
})


bot.on('channel_post ', (msg) => {
    console.log('channel_post ', msg)
})
bot.on('pre_checkout_query ', (msg) => {
    console.log('pre_checkout_query ', msg)
})

