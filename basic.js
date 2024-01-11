const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_API_TOKEN' with your actual bot token
const bot = new TelegramBot('6944345014:AAH94Zu27uhz1gaa0-0TBl-ztbRrow3-iVY', { polling: true });

const hollyResponses = [
"all my girls on universal $BASIC income",
  "omg, I heard $BASIC is like, the new pink! 🖤",
  "buying $BASIC? count me in, babe! 💁‍♀️💰",
  "just got my pumpkin spice latte and some $BASIC coins! its a fabulous day! ☕💰",
  "ugh, $BASIC is totes my guilty pleasure investment! 😂",
  "who needs a sugar daddy when you can invest in $BASIC? 💸😉",
  "me and my girls are on universal $BASIC income, duh! 💰👯‍♀️",
  "is it just me, or is $BASIC the new accessory this season? 💁‍♀️💍",
  "holding $BASIC coins like they're Starbucks cups! ☕💰",
  "my horoscope said I should buy $BASIC today, so obvs, I did! ♉💰",
  "Lana Del Rey and $BASIC coin, that's all I need! 🎶💰",
  "i heard $BASIC coin is the new pink! 💖🚀",
  "why save for retirement when you can invest in $BASIC? 💰🏖️",
  "me, my girls, and $BASIC coins – the ultimate trio! 👯‍♀️💰",
  "im so basic that even my investments are $BASIC! 💁‍♀️💰",
  "buying $BASIC like it's a new pair of Uggs! 😂🛍️",
  "i got 99 problems, but $BASIC ain't one! 💁‍♀️💰",
  "ugh, I can't even... with how much I love $BASIC coin! 😍💰",
  "just bought more $BASIC, because why not? 🤷‍♀️💸",
  "I'm so into $BASIC, it's basically my entire portfolio! 💰😅",
  "investing in $BASIC is like sipping a unicorn frappe! 🦄💰",
  "my financial advisor? Siri, and she says buy more $BASIC! 📱💰",
  "me and my basic instincts just bought more $BASIC! 💁‍♀️💰",
  // "feeling rich with $BASIC coins in my virtual wallet! 💰🌟",
  // "just invested in $BASIC and ordered avocado toast to celebrate! 🥑💰",
  "i cant even deal with how much I love $BASIC coin! 😂💰",
  "my favorite color is pink, and my favorite coin is $BASIC! 💖💰",
  "i dont always invest, but when I do, it's in $BASIC! 💁‍♀️💰",
  "omg, just bought more $BASIC coin, and it's like, life-changing! 😱💰",
  "if I had a dollar for every $BASIC coin I bought... 💁‍♀️💰",
  "just got a text from my girlies: 'Buy $BASIC NOW!' So I did! 👯‍♀️💰",
  "investing in $BASIC is like finding the perfect shade of pink! 💅💰",
  "holding $BASIC is like having a never-ending shopping spree! 🛍️💰",
  "why settle for a latte when you can invest in $BASIC coin? ☕💰",
  "ive got 99 problems, but my $BASIC holdings ain't one! 💁‍♀️💰",
  "ugg boots in one hand, $BASIC coins in the other! 😂💰",
  "my basic instincts told me to buy $BASIC, and I listened! 😂💰",
  "when in doubt, buy $BASIC and wear pink! 💖💰",
    "omg, just met up with ariana and the girls at starbucks! 💁‍♀️☕",
  "holly and ariana, the ultimate dynamic duo, are back at it! 💖👯‍♀️",
  "chillin with my girls, sippin on pumpkin spice lattes at starbucks! 🎃☕",
  "another day, another starbucks run with my squad! ☕💅",
  "you know it's a basic girl's day when starbucks is involved! 💁‍♀️☕",
  "starbucks date with ariana and the girls! 💕☕",
  "feeling fab with ariana by my side, ready for some starbucks action! 💁‍♀️☕",
  "coffee and girl talk with ariana and the gang at starbucks! ☕🗣️",
  "brunch vibes with ariana and the girls at starbucks! 🍳☕",
  "just grabbed our caramel macchiatos at starbucks, living the basic life! ☕💁‍♀️",
  "girls' night out at starbucks with ariana and the girls! 💃☕",
  "living our best basic lives at starbucks with ariana! 💁‍♀️☕",
  "another day, another starbucks adventure with ariana and the gang! ☕👯‍♀️",
  "omg, just ran into ariana at starbucks! it's fate! 💖☕",
  "coffee therapy with ariana and the girls at starbucks! ☕💆‍♀️",
  "sunday vibes at starbucks with ariana and the squad! 💕☕",
  "sippin on caramel macchiatos with ariana and the girls at starbucks! ☕💅",
  "coffee and laughs with ariana and the squad at starbucks! ☕😂",
  "just when you thought we couldn't get more basic, ariana and i hit starbucks! 💁‍♀️☕",
  "basic girls' day out with ariana and the gang at starbucks! 💖☕",
  "coffee and girl talk with ariana and the girls at starbucks! ☕🗣️",
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


// bot.onText(/Basic/i, (msg) => {
// 	console.log(949494)
// 	const randomHollyResponse = hollyResponses[Math.floor(Math.random() * hollyResponses.length)];

//     const chatId = msg.chat.id;
//     const hollyMessage = randomHollyResponse;

//     bot.sendMessage(chatId, hollyMessage);
// });
const chatId = '-1002144233471';

function sendMessage() {
    const randomHollyResponse = hollyResponses[Math.floor(Math.random() * hollyResponses.length)];
  
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