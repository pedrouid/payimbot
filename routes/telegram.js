const request = require('request');
const uuidv4 = require('uuid/uuidv4');
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
const getChat = chatId =>
  request.post(
    baseUrl + '/getChat',
    {
      form: {
        chat_id: chatId
      }
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
      }
      const bodyObj = JSON.parse(body);
      console.log(JSON.stringify(bodyObj, null, 2));
    }
  );
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
      getChat(chat);
      switch (command) {
        case '/help':
          sendMessage(chat, helpCommand);
          break;
        default:
          break;
      }
    } else if (req.body.inline_query) {
      const command = req.body.inline_query.query;
      const id = req.body.inline_query.id;
      switch (command) {
        case '/send':
          answerInlineQuery(id, 'Send', 'Do you want to send?');
          break;
        default:
          break;
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = TelegramController;
