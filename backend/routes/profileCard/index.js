const express = require('express');
const router = express.Router();

const asyncWrapper = require('../../context/asyncWrapper');
const { profile_card: ProfileCard } = require('../../models');

router.get('/', asyncWrapper(async (req, res) => {
  const list = await ProfileCard.findAll();

  res.json({
    list,
  });
}));

router.post('/create-profile-card', asyncWrapper(profileCardController.createProfileCard));

router.get('/:id', asyncWrapper(profileCardController.getProfileCard));

router.put('/:id', asyncWrapper(profileCardController.updateProfileCard));

router.delete('/:id', asyncWrapper(profileCardController.deleteProfileCard));

module.exports = router;
