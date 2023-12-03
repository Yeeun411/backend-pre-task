const { 
    ProfileCardCreateDto,  
    ProfileCardResponseDto,
    ProfileCardUpdateDto,
} = require('../dtos/profile_cards');
const { 
    createProfileCardService,
    getProfileCardService,
    updateProfileCardService,
    deleteProfileCardService,
} = require('../services/profile_cards');

exports.createProfileCardController = async (req, res) => {
  try {

    console.log(req.body);
    const name = req.body.name;
    // console.log(typeof(name));
    // const createDto = new ProfileCardCreateDto(name);
    // const profileCard = await createProfileCardService(createDto);
    const profileCard = await createProfileCardService(name);

    res.status(201).json(profileCard);

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

exports.getProfileCardController = async (req, res) => {
  try {
    const profileCardId = parseInt(req.params.profileId);
    const profileCardData = await getProfileCardService(profileCardId);

    if (!profileCardData) {
      return res.status(404).send("Profile card not found");
    }

    res.json(profileCardData);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).send(error.message);
  }
};

exports.deleteProfileCardController = async (req, res) => {
    try {
      const profileCardId = parseInt(req.params.profileId);
  
      const deletedProfileCard = await deleteProfileCardService(profileCardId);
  
      res.status(200).json(deletedProfileCard);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };
