const express = require('express');
const router = express.Router();

const profileCardRoutes = require('./profileCard/index');
const profileCardListRoutes = require('./profileCardList/index');

router.use('/profile_card', profileCardRoutes);
router.use('/profile_card_list', profileCardListRoutes);

module.exports = router;
