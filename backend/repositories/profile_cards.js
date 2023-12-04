const { profile_card, profile_field, career_field } = require('../models');

exports.createProfileCard = async (createDto) => {
  const profileCard =  await profile_card.create({
    name: createDto
  });
  return profileCard;
};

exports.createCareerField = async(id, company_name, role, start_date, end_date) => {
  try {

    const profileId = parseInt(id);
    if (isNaN(profileId)) {
      console.error("Invalid profileId: Unable to parse id to integer.", id);
      return false;
    }

    const created = await career_field.create({
      profile_id: profileId,
      company_name: company_name,
      role: role,
      start_date: start_date,
      end_date: end_date
    });

    if (created) {
      console.log("Successfully created careerField", created.get());
      return true;
    } else {
      console.error("Failed to create careerField.");
      return false;
    }
  }
  catch (error) {
    console.error("Error in createProfileCardField:", error);
    return false;
  }
};


exports.createProfileField = async (id, fieldKey, fieldLabel, fieldValue) => {
  try {
    if (!id || !fieldKey || !fieldLabel) {
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
  const profileCard = await profile_card.findByPk(id, {
    attributes: ['id', 'name']
  });
  const profileFields = await profile_field.findAll({
    attributes: ['field_key', 'field_value'],
    where: { profile_id: id }
  });
  console.log("profileFields: ", profileFields);
  const careerFields = await career_field.findAll({
    attributes: ['company_name', 'role', 'start_date', 'end_date'],
    where: { profile_id: id }
  });

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