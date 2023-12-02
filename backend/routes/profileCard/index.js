const express = require('express');
const router = express.Router();

const asyncWrapper = require('../../context/asyncWrapper');
const { profile_card: ProfileCard } = require('../../models');
const profileCardController = require('../../controllers/profileCard');

router.get('/', asyncWrapper(async (req, res) => {
  const list = await ProfileCard.findAll();

  res.json({
    list,
  });
}));

router.post('createProfile/', asyncWrapper(profileCardController.createProfileCard));

router.get('getProfile/:id', asyncWrapper(profileCardController.getProfileCard));

router.post('updateProfile/:id', asyncWrapper(profileCardController.updateProfileCard));

router.post('deleteProfile/:id', asyncWrapper(profileCardController.deleteProfileCard));

module.exports = router;
