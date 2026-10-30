const bot = require('../bot');

module.exports = async (request, response) => {
    try {
        await bot.handleUpdate(request.body);
    } catch (error) {
        console.error("Error handling update", error.message);
    }
    response.send("OK");
};
