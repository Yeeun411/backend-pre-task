const { getProfileList, getAvailableColumns } = require('../repositories/profile_list.js');
const { createValueStructures } = require('../utils/value_structure.js');

exports.fetchProfileListService = async (fetchListDto) => {
    const { page, pageSize, columns, sort } = fetchListDto;

    const profileCardAttributes = ['id', ...columns.filter(col => col === 'name')];
    const careerFieldAttributes = columns.filter(col => ['company_name', 'role', 'start_date', 'end_date'].includes(col));
    const profileFieldAttributes = columns.filter(col => !['name', 'company_name', 'role', 'start_date', 'end_date'].includes(col));

    const { list, total } = await getProfileList(
        page,
        pageSize,
        profileCardAttributes,
        profileFieldAttributes,
        careerFieldAttributes,
        sort
    );

    const formattedList = list.map(item => {
        const formattedItem = {};
        profileCardAttributes.forEach(attr => {
            formattedItem[attr] = item[attr];
        });
        careerFieldAttributes.forEach(attr => {
            formattedItem[attr] = item.career_fields.map(cf => cf[attr]);
        });
        profileFieldAttributes.forEach(attr => {
            const field = item.profile_fields.find(pf => pf.field_key === attr);
            formattedItem[attr] = field ? field.field_value : null;
        });

        return formattedItem;
    });

    return {
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / pageSize),
            pageSize,
            totalItems: total
        },
        list: formattedList
    };
};


exports.fetchAvailableColumnsService = async () => {
    try {
      const profileFieldStructures = await getAvailableColumns();
  
      const staticStructures = [
        { label: '회사명', dataKey: '회사이름', parentDataKey: '경력사항' },
        { label: '직무', dataKey: '직무', parentDataKey: '경력사항' },
        { label: '입사일', dataKey: '입사일', parentDataKey: '경력사항' },
        { label: '퇴사일', dataKey: '퇴사일', parentDataKey: '경력사항' }
      ];
  
      return {columns : [...staticStructures, ...profileFieldStructures]};
    } catch (error) {
      console.error('Error in getValueStructures service:', error);
      throw error;
    }
  };