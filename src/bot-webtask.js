var request = require('request');

var token = '499718647:AAEeEbNgXC2V1fZFkxWJ4yVfZVwOicdR5Uc';
var baseUrl = `https://api.telegram.org/bot${token}`;

var helpCommand = `
You can send and request money with @payimbot

Invite your friends to join at https://payimbot.com/signup/

To send money simply type:
@payimbot /send [amount] [currency]
example
@payimbot /send 49.95 USD

To request money simply type:
@payimbot /ask [amount] [currency]
example 
@payimbot /ask 2.00 USD

To view your balance simply type:
@payimbot /balance

If you have any problems contact us at payimbot@gmail.com`;

var sendMessage = function(chatId, message) {
  request.post(baseUrl + '/sendMessage', {
    form: {
      chat_id: chatId,
      text: message
    }
  });
};

module.exports = function(context, cb) {
  console.log(context.data);
  if (!context.data.message) {
    cb(null, { status: 'inline' });
    return;
  }
  var command = context.data.message.text;
  var chat = context.data.message.chat.id;

  console.log(chat, '===>', command);

  if (command.lastIndexOf('/help', 0) === 0) {
    sendMessage(chat, helpCommand);
    cb(null, { status: 'ok' });
  }
};

