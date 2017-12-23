const request = require('request');
const uuidv4 = require('uuid/v4');
const { TELEGRAM_TOKEN } = require('../config');
const { helpCommand } = require('../commands');

const baseUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const answerInlineQuery = (inlineQueryId, title, message) => {
  const inlineQueryResult = {
    type: 'article',
    id: uuidv4(),
    title,
    input_message_content: {
      message_text: message
    }
  };
  request.post(baseUrl + '/answerInlineQuery', {
    form: {
      inline_query_id: inlineQueryId,
      results: [inlineQueryResult]
    }
  });
};

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
  try {
    // console.log(JSON.stringify(req.body, null, 2));
    if (req.body.message) {
      const command = req.body.message.text;
      const chat = req.body.message.chat.id;
      getFullChat(chat);
      switch (command) {
        case '/help':
          sendMessage(chat, helpCommand);
      }
    } else if (req.body.inline_query) {
      const command = req.body.inline_query.query;
      const id = req.body.inline_query.id;
      switch (command) {
        case '/help':
          answerInlineQuery(id, 'help', helpCommand);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = TelegramController;
