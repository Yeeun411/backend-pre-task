const ProfileCard = require('../models/profile_card');
const ProfileField = require('../models/profile_field');
const CareerField = require('../models/career_field');

exports.createProfile = async (createDto) => {
  return await profile_card.create({
    name: createDto.name
  });
};

exports.getProfileCard = async (id) => {
  const profileCard = await ProfileCard.findByPk(id);
  const profileFields = await ProfileField.findAll({ select: { field_key , field_value } , where: { profile_id: id } });
  const careerFields = await CareerField.findAll({ where: { profile_id: id } });

  return { profileCard, profileFields, careerFields };
};

exports.findProfileById = async (id) => {
  return await profile_card.findByPk(id);
};

exports.findProfileFieldsById = async (profile_id) => {
  return await profile_field.findAll({ where: { id: profile_id } });
};

exports.findCareerFieldsById = async (profile_id) => {
  return await career_field.findAll({ where: { id: profile_id } });
};

exports.updateProfile = async (id, updateDto) => {
    const [updateCount] = await ProfileCard.update(updateDto, { where: { id } });
    return updateCount > 0;
  };

exports.deleteProfile = async (id) => {
    const deleteCount = await ProfileCard.destroy({ where: { id } });
    return deleteCount > 0;
  };