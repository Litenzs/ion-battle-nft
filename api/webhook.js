const bot = require('../bot');

module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Error in webhook:', err);
    res.status(200).send('OK');
  }
};
