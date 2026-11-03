const { Telegraf, Markup } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

const bot = new Telegraf(process.env.BOT_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

bot.start(async (ctx) => {
    const userId = ctx.from.id;
    const username = ctx.from.username || '';
    const firstName = ctx.from.first_name || 'друг';

    const { data, error } = await supabase
        .from('users')
        .upsert({ id: userId, username: username, first_name: firstName });

    if (error) {
        console.error('Supabase error:', error);
        ctx.reply(`Ошибка базы данных: ${error.message}`);
        return;
    }

    ctx.reply(
        `Привет, ${firstName}! 👋\nДобро пожаловать в Ion Battle Nft.\n\nТвой профиль сохранен в базе! Нажми на кнопку внизу, чтобы открыть игру! 🎁`,
        Markup.keyboard([
            [Markup.button.webApp('🎮 Открыть игру', 'https://ion-battle-nft.vercel.app/')]
        ]).resize()
    );
});

module.exports = bot;
