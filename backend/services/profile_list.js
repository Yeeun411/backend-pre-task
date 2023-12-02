const { getProfileList } = require('../repositories');

exports.fetchProfileListService = async (fetchListDto) => {
    const { page, pageSize, columns, sort } = fetchListDto;
    return await getProfileList(page, pageSize, columns, sort);
};
