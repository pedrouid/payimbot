const request = require('request');
const { TELEGRAM_TOKEN } = require('../config');
const { helpCommand } = require('../commands');

const baseUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const sendMessage = function (chatId, message) {
  request.post(baseUrl + '/sendMessage', {
    form: {
      chat_id: chatId,
      text: message
    }
  });
};

const TelegramController = async (req, res, next) => {
  if (req.body.message) {
    const command = req.body.message.text;
    const chat = req.body.message.chat.id;
    switch (command) {
      case '/help':
        sendMessage(chat, helpCommand);
    }
  }
  res.status(200).json({ message: 'hello world' });
};

module.exports = TelegramController;
