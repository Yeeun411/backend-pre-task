const { profile_card, profile_field, career_field } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

exports.getProfileList = async (page, pageSize, profileCardAttributes, profileFieldAttributes, careerFieldAttributes, sortOrder) => {
  try {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const order = [sortOrder];

      const { count, rows } = await profile_card.findAndCountAll({
          attributes: profileCardAttributes,
          include: [
              {
                  model: career_field,
                  as: 'career_fields',
                  attributes: careerFieldAttributes,
                  required: false
              },
              {
                  model: profile_field,
                  as: 'profile_fields',
                  attributes: ['field_key', 'field_value'],
                  required: false
              }
          ],
          order,
          limit,
          offset
      });

      return { list: rows, total: count };
  } catch (error) {
      console.error("Error in getProfileList:", error);
      throw error;
  }
};


exports.getAvailableColumns = async () => {
    try {
      const profileFields = await profile_field.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('field_key')), 'field_key'],
          'field_label'
        ],
        group: ['field_key', 'field_label']
      });
  
      return profileFields.map(pf => ({
        label: pf.field_label,
        dataKey: pf.field_key,
        parentDataKey: null
      }));
    } catch (error) {
      console.error('Error in getAvailableColumns:', error);
      throw error;
    }
  };