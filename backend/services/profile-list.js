const { fetchList } = require('../repositories');

exports.fetchListService = async (fetchListDto) => {
    return await fetchList(fetchListDto);
};
