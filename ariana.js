const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_API_TOKEN' with your actual bot token
const bot = new TelegramBot('6594933718:AAEJVRFJEt5WDRjNrqw5mvdEjCsYLqLaq1Q', { polling: true });


const arianaMessages = [
"all my girls on universal $BASIC income",

  "omg, just met up with holly and the girls at starbucks! 💁‍♀️☕",
  "ariana and holly, the dynamic duo, are back at it! 💖👯‍♀️",
  "chillin with my girls, sippin on pumpkin spice lattes at starbucks! 🎃☕",
  "another day, another starbucks run with my squad! ☕💅",
  "you know it's a basic girls day when starbucks is involved! 💁‍♀️☕",
  "holly and i are starbucks queens! 👑☕",
  "feeling fab with holly by my side, ready for some starbucks action! 💁‍♀️☕",
  "starbucks date with holly and the crew! 💕☕",
  "when in doubt, starbucks it out with holly! 💁‍♀️☕",
  "just rolled into starbucks with holly and the squad! ☕💅",
  "omg, holly and i are on a starbucks adventure! 💖☕",
  "basic girls unite at starbucks! 💁‍♀️☕",
  "sippin on unicorn frappes with holly and the gang! 🦄☕",
  "holly and i are taking over starbucks, one latte at a time! 💪☕",
  "just grabbed our caramel macchiatos at starbucks, living the basic life! ☕💁‍♀️",
  "holly and i are the queens of starbucks! 👑☕",
  "basic girl status: starbucks edition with holly and the crew! 💁‍♀️☕",
  "starbucks runs with holly and the girls are my cardio! 💃☕",
  "coffee and gossip time with holly and the gang at starbucks! ☕🗣️",
  "omg, holly and i are having a starbucks marathon today! ☕💁‍♀️",
  "holly and i are starbucks enthusiasts! 💖☕",
  "coffee dates with holly and the girls are a must! ☕💁‍♀️",
  "holly and i just cant resist starbucks! ☕😍",
  "girls night out at starbucks with holly and the crew! 💃☕",
  "living our best basic lives at starbucks with holly! 💁‍♀️☕",
  // "another day, another starbucks adventure with holly and the gang! ☕👯‍♀️",
  "omg, just ran into holly at starbucks! it's fate! 💖☕",
  "holly and i are starbucks soulmates! ☕💕",
  "starbucks and holly – the perfect combination! 💁‍♀️☕",
  "sippin on lattes with holly and the girls at starbucks! ☕👯‍♀️",
  "just can't resist a starbucks hangout with holly! 💁‍♀️☕",
  "holly and i are basically starbucks addicts! ☕😂",
  "coffee and girl talk with holly and the crew at starbucks! 💁‍♀️☕",
  "holly and i are keeping starbucks in business, one cup at a time! ☕👑",
  "sunday vibes at starbucks with holly and the squad! 💕☕",
  "starbucks is our second home, right holly? 💖☕",
  "sippin on caramel macchiatos with holly and the girls at starbucks! ☕💅",
  "holly and i are starbucks queens, ruling the coffee world! 👑☕",
  "starbucks squaddd! ☕😂",
  "just when you thought we couldn't get more basic, holly and i hit starbucks! 💁‍♀️☕",
  "basic girls day out with holly and the gang at starbucks! 💖☕",
  "holly and i are taking our starbucks game to the next level! ☕👯‍♀️",
  "starbucks is the place to be, especially with holly by my side! 💁‍♀️☕",
];



// bot.onText(/jeet/i, (msg) => {
//   const randomHollyResponse = arianaMessages[Math.floor(Math.random() * hollyResponses.length)];
  
//     const chatId = msg.chat.id;
//     const hollyMessage = randomHollyResponse;

//     bot.sendMessage(chatId, hollyMessage);
// });


// bot.onText(/Buy!/i, (msg) => {
//   const randomHollyResponse = hollyResponses[Math.floor(Math.random() * hollyResponses.length)];

//     const chatId = msg.chat.id;
//     const hollyMessage = randomHollyResponse;

//     bot.sendMessage(chatId, hollyMessage);
// });

const chatId = '-1002144233471';

// Function to send a message
function sendMessage() {
    const randomHollyResponse = arianaMessages[Math.floor(Math.random() * arianaMessages.length)];
  
  // Send the message to the specified chat ID
  bot.sendMessage(chatId, randomHollyResponse)
    .then(() => {
      console.log('Message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
}

setInterval(sendMessage, 10000)