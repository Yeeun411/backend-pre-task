const { validationResult } = require("express-validator");
const { 
    ProfileCardCreateDto,
    ProfileCardResponseDto,
    ProfileCardUpdateDto,
    FetchListDto
} = require('../dtos');
const { 
    createProfileCardService, 
    getProfileCardService, 
    updateProfileCardService, 
    deleteProfileCardService, 
    fetchListService, 
    fetchColumnsService
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


exports.getProfileCard = async (req, res) => {
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
    const profileCardId = parseInt(req.params.id);
    const updateDto = new ProfileCardUpdateDto(req.body);

    const success = await updateProfileCardService(profileCardId, updateDto);

    res.json({ success });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteProfileCardController = async (req, res) => {
    try {
      const profileCardId = parseInt(req.params.id);
  
      const success = await deleteProfileCardService(profileCardId);
  
      res.json({ success });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };