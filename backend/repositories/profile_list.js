const ProfileCard = require('../models/profile_card');
const ProfileField = require('../models/profile_field');
const CareerField = require('../models/career_field');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

exports.getProfileList = async (page, pageSize, columns, sortOrder) => {
    try {
        const offset = (page - 1) * pageSize;
        const order = sortOrder ? [[sortOrder[0], sortOrder[1]]] : [];

        const profileFieldAttributes = columns.includes('profileFields') ? ['field_key', 'field_value'] : [];
        const careerFieldAttributes = columns.includes('careerFields') ? ['company_name', 'role', 'start_date', 'end_date'] : [];

        const { count, rows } = await ProfileCard.findAndCountAll({
            attributes: columns.filter(column => !['profileFields', 'careerFields'].includes(column)),
            include: [
                {
                    model: ProfileField,
                    attributes: profileFieldAttributes,
                    required: false
                },
                {
                    model: CareerField,
                    attributes: careerFieldAttributes,
                    required: false
                }
            ],
            order,
            limit: pageSize,
            offset
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
