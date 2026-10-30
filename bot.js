const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    const userName = ctx.from.first_name || 'друг';
    
    ctx.reply(
        `Привет, ${userName}! 👋\nДобро пожаловать в Ion Battle Nft.\n\nНажми на кнопку внизу экрана, чтобы открыть игру и начать крутить кейсы! 🎁`,
        Markup.keyboard([
            [Markup.button.webApp('🎮 Открыть игру', 'https://ion-battle-nft.vercel.app/')]
        ]).resize()
    );
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
