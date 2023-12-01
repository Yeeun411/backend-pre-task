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

const profileCardController = require('../../controllers/profile_card');

// 신규 연락처 생성
router.post('/create-profile-card', profileCardController.createProfileCard);

// 연락처 조회
router.get('/:id', profileCardController.getProfileCard);

// 연락처 정보 수정
router.put('/:id', profileCardController.updateProfileCard);

// 연락처 삭제
router.delete('/:id', profileCardController.deleteProfileCard);

module.exports = router;
