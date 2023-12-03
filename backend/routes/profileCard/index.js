const express = require('express');
const router = express.Router();

const asyncWrapper = require('../../context/asyncWrapper');
const { profile_card: ProfileCard } = require('../../models');
const {createProfileCardController,
  getProfileCardController,
  updateProfileCardController,
  deleteProfileCardController
} = require('../../controllers/profile_cards');

router.get('/', asyncWrapper(async (req, res) => {
  const list = await ProfileCard.findAll();

  res.json({
    list,
  });
}));

router.post('/createProfile/', asyncWrapper(createProfileCardController));

router.get('/getProfile/', asyncWrapper(getProfileCardController));

router.post('/updateProfile/:id', asyncWrapper(updateProfileCardController));

router.post('/deleteProfile/:id', asyncWrapper(deleteProfileCardController));

module.exports = router;
