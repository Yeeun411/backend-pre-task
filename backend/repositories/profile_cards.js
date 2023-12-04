const { profile_card, profile_field, career_field } = require('../models');

exports.createProfileCard = async (createDto) => {
  const profileCard =  await profile_card.create({
    name: createDto
  });
  return profileCard;
};


exports.createProfileCardField = async (id, fieldKey, fieldLabel, fieldValue) => {
  try {
    if (!id || !fieldKey || !field_label) {
      console.error("Invalid arguments: id and fieldKey and fieldLabel are required.");
      return false;
    }

    const profileId = parseInt(id);
    if (isNaN(profileId)) {
      console.error("Invalid profileId: Unable to parse id to integer.", id);
      return false;
    }

    const created = await profile_field.create({
      profile_id: profileId,
      field_key: fieldKey,
      field_value: fieldValue,
      field_label: fieldLabel
    });

    if (created) {
      console.log("Successfully created profileField", created.get());
      return true;
    } else {
      console.error("Failed to create profileField.");
      return false;
    }
  } catch (error) {
    console.error("Error in createProfileCardField:", error);
    return false;
  }
}


exports.getProfileCard = async (id) => {
  const profileCard = await profile_card.findByPk(id);
  const profileFields = await profile_field.findAll({
    attributes: ['field_key', 'field_value'],
    where: { profile_id: id }
  });
  const careerFields = await career_field.findAll({ where: { profile_id: id } });

  return { profileCard, profileFields, careerFields };
};


exports.updateProfileField = async (profileId, newValue) => {
  try {
      for (const key in newValue) {
          await profile_field.upsert({
              profile_id: profileId,
              field_key: key,
              field_value: newValue[key]
          });
      }
      return true;
  } catch (error) {
      console.error(error);
      return false;
  }
};

exports.updateCareerField = async (profileId, itemIndex, newValue) => {
  try {
      await career_field.update(newValue, {
          where: {
              profile_id: profileId,
              item_index: itemIndex
          }
      });
      return true;
  } catch (error) {
      console.error(error);
      return false;
  }
};





exports.deleteProfileCard = async (id) => {
  try {
      const deleteCount = await profile_card.destroy({ where: { id } });
      return deleteCount > 0;
  } catch (error) {
      return false;
  }
};