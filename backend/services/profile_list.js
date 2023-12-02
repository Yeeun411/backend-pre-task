const { getProfileList } = require('../repositories');
const { createValueStructures } = require('../utils');

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