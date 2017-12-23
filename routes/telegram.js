const request = require('request');
const { TELEGRAM_TOKEN } = require('../config');
const { helpCommand } = require('../commands');

const baseUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const getFullChat = chatId =>
  request.post(baseUrl + '/getFullChat', {
    form: {
      chat_id: chatId
    }
  });

const sendMessage = (chatId, message) =>
  request.post(baseUrl + '/sendMessage', {
    form: {
      chat_id: chatId,
      text: message
    }
  });

const TelegramController = async (req, res, next) => {
  console.log(JSON.stringify(req.body, null, 2));
  try {
    if (req.body.message) {
      const command = req.body.message.text;
      const chat = req.body.message.chat.id;
      getFullChat(chat);
      switch (command) {
        case '/help':
          sendMessage(chat, helpCommand);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = TelegramController;
