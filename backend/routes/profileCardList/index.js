const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../context/asyncWrapper');
const { fetchListController, fetchColumnsController } = require('../../controllers');

router.get('/', asyncWrapper(fetchListController));

router.get('/columns', asyncWrapper(fetchColumnsController));

module.exports = router;