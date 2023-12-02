const ProfileCard = require('../models/profile_card');
const ProfileField = require('../models/profile_field');
const CareerField = require('../models/career_field');
const profile_field = require('../models/profile_field');

exports.createProfileCard = async (createDto) => {
  return await profile_card.create({
    name: createDto.name
  });
};

exports.createProfileCardField = async (id, fieldKey, fieldValue) => {
  const [updateCount] = await profile_field.create({ field_key: fieldKey, field_value: fieldValue}, { where: { profile_id: id} });
  return updateCount > 0;
}

exports.getProfileCard = async (id) => {
  const profileCard = await ProfileCard.findByPk(id);
  const profileFields = await ProfileField.findAll({
    attributes: ['field_key', 'field_value'],
    where: { profile_id: id }
  });
  const careerFields = await CareerField.findAll({ where: { profile_id: id } });

  return { profileCard, profileFields, careerFields };
};


exports.updateProfileField = async (profileId, newValue) => {
  try {
      for (const key in newValue) {
          await ProfileField.upsert({
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
      await CareerField.update(newValue, {
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
      const deleteCount = await ProfileCard.destroy({ where: { id } });
      return deleteCount > 0;
  } catch (error) {
      return false;
  }
};