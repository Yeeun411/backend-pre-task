const express = require('express');
const router = express.Router();

const profileCardRoutes = require('./profileCard');
const profileCardListRoutes = require('./profileCardList');

router.use('/profile_card', profileCardRoutes);
router.use('/profile_card_list', profileCardListRoutes);

module.exports = router;
