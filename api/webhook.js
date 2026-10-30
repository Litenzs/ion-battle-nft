const bot = require('../bot');

module.exports = async (req, res) => {
    try {
        await bot.handleUpdate(req.body);
        res.status(200).send('OK');
    } catch (error) {
        console.error('Ошибка при обработке сообщения:', error);
        res.status(200).send('OK');
    }
};
