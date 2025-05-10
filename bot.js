const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Le bot tourne !'));
app.listen(3000, () => console.log('Serveur web en ligne'));
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Ton ID personnel Telegram
const ADMIN_ID = 7346489824;

// Message de bienvenue
bot.onText(/\/start/, (msg) => {
  const welcomeMessage = `Bienvenue sur le bot officiel du groupe :
*J'apprends à programmer en HTML, CSS, JS, PHP, MySQL*

Tu peux ecrit ton probleme ici suivi de ton numero whastapp et nous esseyerons de vous aider

Merci de commencer ton message par ton nom *Facebook ou WhatsApp* pour qu’on puisse te retrouver plus facilement.`;
  bot.sendMessage(msg.chat.id, welcomeMessage, { parse_mode: 'Markdown' });
});

// Réception de message utilisateur
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Ne pas transférer les commandes comme /start
  if (msg.text && !msg.text.startsWith('/')) {
    const forwardMsg = `📩 *Nouveau message reçu* :

*De* : ${msg.from.first_name} ${msg.from.last_name || ''}
*ID utilisateur* : ${msg.from.id}

*Message* :
${msg.text}`;

    bot.sendMessage(ADMIN_ID, forwardMsg, { parse_mode: 'Markdown' });
  }
});
