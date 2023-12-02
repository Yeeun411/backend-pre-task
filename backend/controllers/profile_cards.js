const { validationResult } = require("express-validator");
const { 
    ProfileCardCreateDto,  
    ProfileCardResponseDto,
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
    
      const profileId = req.params.id;
      const { parentDataKey, itemIndex, newValue } = req.body;
      const updateDto = new ProfileCardUpdateDto({parentDataKey, itemIndex, newValue });

      const result = await updateProfileCardService(profileId, updateDto);

      if (!result) {
          return res.status(404).send("Unable to update profile card");
      }

      res.status(200).json({ message: "Profile card updated successfully" });
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