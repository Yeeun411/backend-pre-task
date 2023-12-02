const express = require('express');
const router = express.Router();

const profileCardRoutes = require('./profileCard');

router.use('/profile_card', profileCardRoutes);

module.exports = router;
