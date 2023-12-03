const { getProfileList } = require('../repositories/profile_list.js');
const { getProfileCard } = require('../repositories/profile_cards.js');
const { createValueStructures } = require('../utils/value_structure.js');

exports.fetchProfileListService = async (fetchListDto) => {
    const { page, pageSize, columns, sort } = fetchListDto;
    return await getProfileList(page, pageSize, columns, sort);
};

exports.fetchAvailableColumnsService = async (id) => {
    const { profileCard, profileFields, careerFields } = await getProfileCard(id);
    if (!profileCard) return null;
    const valueStructures = createValueStructures(profileFields, careerFields);
    return { valueStructures };
};