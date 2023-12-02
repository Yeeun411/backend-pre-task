const { fetchList } = require('../repositories');

exports.fetchColumnsService = async () => {
    const fieldKeys = await fetchColumns();
    const columns = [
        { label: '이름', dataKey: 'name', type: 'string', parentDataKey: null },
        ...fieldKeys.map(key => ({ label: key, dataKey: key, type: 'string', parentDataKey: null }))
    ];

    return columns;
};

exports.fetchListService = async (query) => {
    const { page, pageSize, columns, sort } = query;
    return await fetchList(page, pageSize, columns, sort);
}