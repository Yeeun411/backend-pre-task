const { getProfileList, getAvailableColumns } = require('../repositories/profile_list.js');

exports.fetchProfileListService = async (fetchListDto) => {
  const { page, pageSize, columns, sort } = fetchListDto;

  if(sort[1] !== 'asc' && sort[1] !== 'desc') {
    sort = [];
  }

  const profileCardAttributes = ['id', ...columns.filter(col => col === 'name')];
  const careerFieldMappings = {
    'career_company_name_0': 'company_name',
    'career_role_0': 'role',
    'career_start_date_0': 'start_date',
    'career_end_date_0': 'end_date'
  };
  const careerFieldAttributes = columns
    .filter(col => Object.keys(careerFieldMappings).includes(col))
    .map(col => careerFieldMappings[col]);

  const profileFieldAttributes = columns.filter(col => 
    !['name', ...Object.keys(careerFieldMappings)].includes(col)
  );

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

        const originalKey = Object.keys(careerFieldMappings).find(key => careerFieldMappings[key] === attr);
        formattedItem[originalKey] = item.career_fields.length > 0 ? item.career_fields[0][attr] : null;
      });
      profileFieldAttributes.forEach(attr => {
          const field = item.profile_fields.find(pf => pf.field_key === attr);
          formattedItem[attr] = field ? field.field_value : null;
      });

      return formattedItem;
  });

  return {
      current: page,
      pageSize,
      total: total,
      list: formattedList
  };
};


exports.fetchAvailableColumnsService = async () => {
  try {
    const profileFieldStructures = await getAvailableColumns();

    const staticStructures = [
      { label: '경력사항-회사명', dataKey: "company_name", parentDataKey: "career"},
      { label: '경력사항-직무', dataKey: "role", parentDataKey: "career" },
      { label: '경력사항-입사일', dataKey: "start_date", parentDataKey: "career" },
      { label: '경력사항-퇴사일', dataKey: "end_date", parentDataKey: "career" }
    ];

    return {columns : [...staticStructures, ...profileFieldStructures]};
  } catch (error) {
    console.error('Error in getValueStructures service:', error);
    throw error;
  }
  };