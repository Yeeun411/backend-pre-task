const ProfileCard = require('../models/profile_card');
const ProfileField = require('../models/profile_field');
const CareerField = require('../models/career_field');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.fetchColumns = async () => {
    const fields = await ProfileField.findAll({
        attributes: ['field_key'],
        group: ['field_key']
    });

    return fields.map(field => field.field_key);
};

exports.fetchList = async(page, pageSize, columns, sortOrder) => {
    const offset = (page - 1) * pageSize;
    const order = sortOrder ? [[sortOrder.column, sortOrder.direction]] : [];

    const { rows, count } = await ProfileCard.findAndCountAll({
        attributes: ['id', 'name', ...columns],
        order,
        limit: pageSize,
        offset,
        include: [
            {
                model: ProfileField,
                attributes: ['field_key', 'field_value'],
                where: { field_key: { [Op.in]: columns } },
                required: false
            },
            {
                model: CareerField,
                attributes: [['company_name', '회사명'], ['role', '직무'], ['start_date', '입사일'], ['end_date', '퇴사일']],
                required: false,
                order: [['updated_at', 'DESC']],
                limit: 1
            }
        ]
    });

    return {
        list: rows.map(row => row.get({ plain: true })),
        total: count
    };
}