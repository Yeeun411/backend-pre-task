const profileCardsRepository = require('./profile-cards');
const profileListsRepository = require('./profile-list');
module.exports = {
    ...profileCardsRepository,
    ...profileListsRepository
};