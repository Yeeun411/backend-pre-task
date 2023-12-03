const express = require('express');
const router = express.Router();

const profileCardRoutes = require('./ProfileCard/index.js');
const profileCardListRoutes = require('./ProfileCardList/index.js');

router.use('/profile_card', profileCardRoutes);
router.use('/profile_card_list', profileCardListRoutes);

module.exports = router;