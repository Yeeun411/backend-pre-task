const { profile_card, profile_field, career_field } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

exports.getProfileList = async (page, pageSize, profileCardAttributes, profileFieldAttributes, careerFieldAttributes, sortOrder) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    let order;

    const standardFields = ['name', 'company_name', 'role', 'start_date', 'end_date'];
    if (standardFields.includes(sortOrder[0])) {
      order = [sortOrder];
    } else if (profileFieldAttributes.includes(sortOrder[0])) {
      order = Sequelize.literal(`
        (
          SELECT pf.field_value
          FROM profile_field AS pf
          WHERE pf.profile_id = profile_card.id AND pf.field_key = '${sortOrder[0]}'
          ORDER BY pf.field_value ${sortOrder[1]}
          LIMIT 1
        )
      `);
    }

    const rows = await profile_card.findAll({
      attributes: profileCardAttributes,
      include: [
        {
          model: career_field,
          as: 'career_fields',
          attributes: careerFieldAttributes,
          required: false
        },{
          model: profile_field,
          as: 'profile_fields',
          attributes: ['field_key','field_value'],
          required: false
        }
      ],
      order: order instanceof Sequelize.Utils.Literal ? [[order, sortOrder[1]]] : order,
      limit,
      offset
    });
    const count = await profile_card.count({
      distinct: true
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