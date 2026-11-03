const { Telegraf, Markup } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

const bot = new Telegraf(process.env.BOT_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function sendMessageWithRetry(ctx, text, extra = {}) {
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            await ctx.reply(text, extra);
            return;
        } catch (err) {
            console.error(`Попытка ${attempt} не удалась:`, err.message);
            if (attempt === maxAttempts) {
                console.error('Все попытки отправки сообщения исчерпаны.');
                throw err;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

bot.start(async (ctx) => {
    const userId = ctx.from.id;
    const username = ctx.from.username || '';
    const firstName = ctx.from.first_name || 'друг';

    await supabase
        .from('users')
        .upsert({ id: userId, username: username, first_name: firstName });

    await ctx.reply('Очищаю старые кнопки...', Markup.removeKeyboard());

    await sendMessageWithRetry(
        ctx,
        `Привет, ${firstName}! 👋\nДобро пожаловать в Ion Battle Nft.\n\nНажми на кнопку ниже, чтобы открыть игру и начать крутить кейсы! 🎁`,
        Markup.inlineKeyboard([
            Markup.button.webApp('🎮 Открыть игру', 'https://ion-battle-nft.vercel.app/')
        ])
    );
});

module.exports = bot;
