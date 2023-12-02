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

router.post('/', asyncWrapper(profileCardController.createProfileCard));

router.get('/:id', asyncWrapper(profileCardController.getProfileCard));

router.put('/:id', asyncWrapper(profileCardController.updateProfileCard));

router.delete('/:id', asyncWrapper(profileCardController.deleteProfileCard));

module.exports = router;
