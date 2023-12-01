const profileCardsService = require('./profile-cards');
const profileListService = require('./profile-list');

module.exports = {
    ...profileCardsService,
    ...profileListService
};