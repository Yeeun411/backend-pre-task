const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../context/asyncWrapper');
const { fetchListController, fetchAvailableColumnsController } = require('../../controllers');

router.get('/', asyncWrapper(fetchListController));

router.get('/columns', asyncWrapper(fetchAvailableColumnsController));

module.exports = router;