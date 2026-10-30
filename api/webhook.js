const bot = require('../bot');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(200).send('OK');
  }

  const update = req.body;

  if (!update || !update.update_id) {
    return res.status(200).send('OK');
  }

  try {
    await bot.handleUpdate(update);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Error in webhook:', err);
    res.status(200).send('OK');
  }
};
