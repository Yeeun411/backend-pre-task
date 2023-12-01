const profileCardsController = require('./profile-cards');
const profileListController = require('./profile-list');

module.exports = {
    ...profileCardsController,
    ...profileListController
};