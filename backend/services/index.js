const profileCardsService = require('./profile_cards');
const profileListService = require('./profile_list');

module.exports = {
    ...profileCardsService,
    ...profileListService
};