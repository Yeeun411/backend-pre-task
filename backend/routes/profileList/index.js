const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../context/asyncWrapper');
const profileListController = require('../../controllers/profileList');
const profileCardController = require('../../controllers/profileCard');

router.get('/list', asyncWrapper(profileListController.fetchList));

router.get('/columns', asyncWrapper(profileCardController.fetchColumns));

module.exports = router;