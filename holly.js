const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('6514375610:AAE6dk53Xu0MauUZOIgRp8OByuev7iEYRsk', { polling: true });


const hollyMessages = [
  "omg, just met up with ariana and the girls at starbucks! 💁‍♀️☕",
  "holly and ariana, the ultimate dynamic duo, are back at it! 💖👯‍♀️",
  "chillin with my girls, sippin on pumpkin spice lattes at starbucks! 🎃☕",
  "another day, another starbucks run with my squad! ☕💅",
  "you know it's a basic girl's day when starbucks is involved! 💁‍♀️☕",
  "starbucks date with ariana and the crew! 💕☕",
  "feeling fab with ariana by my side, ready for some starbucks action! 💁‍♀️☕",
  "coffee and girl talk with ariana and the gang at starbucks! ☕🗣️",
  "brunch vibes with ariana and the girls at starbucks! 🍳☕",
  "just grabbed our caramel macchiatos at starbucks, living the basic life! ☕💁‍♀️",
  "girls' night out at starbucks with ariana and the crew! 💃☕",
  "living our best basic lives at starbucks with ariana! 💁‍♀️☕",
  "another day, another starbucks adventure with ariana and the gang! ☕👯‍♀️",
  "omg, just ran into ariana at starbucks! it's fate! 💖☕",
  "coffee therapy with ariana and the crew at starbucks! ☕💆‍♀️",
  "sunday vibes at starbucks with ariana and the squad! 💕☕",
  "sippin on caramel macchiatos with ariana and the girls at starbucks! ☕💅",
  "coffee and laughs with ariana and the squad at starbucks! ☕😂",
  "just when you thought we couldn't get more basic, ariana and i hit starbucks! 💁‍♀️☕",
  "basic girls' day out with ariana and the gang at starbucks! 💖☕",
  "coffee and girl talk with ariana and the crew at starbucks! ☕🗣️",
  "omg, ariana and i are having a starbucks marathon today! ☕💁‍♀️",
  "basic girls unite at starbucks! 💁‍♀️☕",
  "sunday funday at starbucks with ariana and the squad! 💁‍♀️☕",
  "holly and ariana, the starbucks queens, are back in action! 👑☕",
  "sippin on unicorn frappes with ariana and the gang! 🦄☕",
  "ariana and i are on a coffee adventure! ☕💖",
  "ariana and i are keeping starbucks in business, one cup at a time! ☕👑",
  "sundays are meant for starbucks with ariana and the crew! 💕☕",
  "brunch dates at starbucks with ariana and the girls! 🍳☕",
  "just got our pumpkin spice lattes at starbucks, and life is good! 🎃☕",
  "ariana and i are the ultimate starbucks buddies! 💁‍♀️☕",
  "coffee, laughter, and ariana – the perfect recipe for happiness at starbucks! ☕😂",
  "sippin on lattes with ariana and the girls at starbucks! ☕👯‍♀️",
  "ariana and i just can't resist starbucks! ☕😍",
  "starbucks runs with ariana and the squad are the best kind of runs! 💃☕",
  "girls' day out at starbucks with ariana and the gang! 💁‍♀️☕",
  "living the basic life with ariana at starbucks! 💖☕",
  "ariana and i are the queens of coffee! 👑☕",
  "another starbucks adventure with ariana and the crew! ☕👯‍♀️",
  "ariana and i are starbucks aficionados! ☕👯‍♀️",
  "coffee dates with ariana and the girls are the highlight of my day! ☕💖",
  "sippin' on caramel macchiatos with ariana and the squad at starbucks! ☕💅",
  "starbucks is our second home, right ariana? 💖☕",
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

// const chatId = '-1002144233471';

// // Function to send a message
// function sendMessage() {
//     const randomHollyResponse = hollyMessages[Math.floor(Math.random() * hollyMessages.length)];
  
//   // Send the message to the specified chat ID
//   bot.sendMessage(chatId, randomHollyResponse)
//     .then(() => {
//       console.log('Message sent successfully');
//     })
//     .catch((error) => {
//       console.error('Error sending message:', error);
//     });
// }

// setInterval(sendMessage, 600000)

const chatId = '-1002144233471';

// Function to send a message
function sendMessage() {
    const randomHollyResponse = hollyMessages[Math.floor(Math.random() * arianaMessages.length)];
  
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