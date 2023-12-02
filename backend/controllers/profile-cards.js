const { validationResult } = require("express-validator");
const { 
    ProfileCardCreateDto,  ProfileCardResponseDto,
    ProfileCardUpdateDto,
} = require('../dtos');
const { 
    createProfileCardService, 
    getProfileCardService, 
    updateProfileCardService, 
    deleteProfileCardService, 
} = require('../services');

exports.createProfileCardController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const createDto = new ProfileCardCreateDto(req.body.name);
    const profileCard = await createProfileCardService(createDto);

    res.status(201).json(profileCard);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getProfileCardController = async (req, res) => {
  try {
      const profileCardId = parseInt(req.params.id);
      const profileCardData = await getProfileCardService(profileCardId);

      if (!profileCardData) {
          return res.status(404).send("Profile card not found");
      }

      res.json(new ProfileCardResponseDto(profileCardData.value, profileCardData.valueStructures));
  } catch (error) {
      res.status(500).send(error.message);
  }
};

exports.updateProfileCardController = async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const updateDto = new ProfileCardUpdateDto(req.body);
      const updatedProfileCard = await updateProfileCardService(req.params.id, updateDto);

      if (!updatedProfileCard) {
          return res.status(404).send("Profile card not found");
      }

      res.status(200).json(updatedProfileCard);
  } catch (error) {
      res.status(500).send(error.message);
  }
};

exports.deleteProfileCardController = async (req, res) => {
    try {
      const profileCardId = parseInt(req.params.id);
  
      const deletedProfileCard = await deleteProfileCardService(profileCardId);
  
      res.status(200).json(deletedProfileCard);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };