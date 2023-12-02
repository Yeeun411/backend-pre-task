const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../context/asyncWrapper');
const { fetchProfileListController,fetchAvailableColumnsController } = require('../../controllers');

router.get('/', asyncWrapper(fetchProfileListController ));

router.get('/columns', asyncWrapper(fetchAvailableColumnsController));

module.exports = router;