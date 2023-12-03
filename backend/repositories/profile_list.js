const { profile_card, profile_field, career_field } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

exports.getProfileList = async (page, pageSize, columns, sortOrder) => {
    try {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        
        
        const order = sortOrder ? [[sortOrder[0], sortOrder[1]]] : [];

        const profileFieldAttributes = columns.includes('profileFields') ? ['field_key', 'field_value'] : [];
        const careerFieldAttributes = columns.includes('careerFields') ? ['company_name', 'role', 'start_date', 'end_date'] : [];

        const { count, rows } = await profile_card.findAndCountAll({
            attributes: columns.filter(column => !['profileFields', 'careerFields'].includes(column)),
            include: [
                {
                    model: profile_field,
                    as: 'profile_fields',
                    attributes: profileFieldAttributes,
                    required: false
                },
                {
                    model: career_field,
                    as: 'career_fields',
                    attributes: careerFieldAttributes,
                    required: false
                }
            ],
            order,
            limit: limit,
            offset: offset
        });

        return {
            list: rows.map(row => row.get({ plain: true })),
            total: count
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};