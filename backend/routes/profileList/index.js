const express = require('express');
const router = express.Router();
const profileCardController = require('../../controllers/ProfileCardController');

router.get('/fetch-list', profileCardController.fetchList);

module.exports = router;