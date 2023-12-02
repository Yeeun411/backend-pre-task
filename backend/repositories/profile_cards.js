const ProfileCard = require('../models/profile_card');
const ProfileField = require('../models/profile_field');
const CareerField = require('../models/career_field');
const profile_field = require('../models/profile_field');

exports.createProfileCard = async (createDto) => {
  return await profile_card.create({
    name: createDto.name
  });
};

exports.createProfileCardField = async (id, field_key, field_value) => {
  const [updateCount] = await profile_field.create({ field_key: field_key, field_value: field_value}, { where: { profile_id: id} });
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


exports.updateProfileCard = async (id, updateData) => {
  try {
    const updateCount = await ProfileCard.update(updateData, { where: { id } });
    let profileFieldUpdateSuccess = true;

    if (updateData.profileFields) {
        for (const field of updateData.profileFields) {
            const [updateFieldCount] = await ProfileField.update({ field_value: field.value }, { where: { profile_id: id, field_key: field.key } });
            if (updateFieldCount === 0) {
                profileFieldUpdateSuccess = false;
            }
        }
    }

    return (updateCount[0] > 0 || profileFieldUpdateSuccess);
  } catch (error) {
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