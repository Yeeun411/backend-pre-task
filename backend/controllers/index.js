const profileCardsController = require('./profile_cards');
const profileListController = require('./profile_list');

module.exports = {
    ...profileCardsController,
    ...profileListController
};