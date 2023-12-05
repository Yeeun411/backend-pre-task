function createValueStructures(name, profileFields) {
  return [
      ...profileFields.map(field => ({
          label: field.field_label,
          dataKey: field.field_key,
          type: field.field_type,
          parentDataKey: null
      })),
      {
          label: "경력사항",
          dataKey: "career",
          type: "list",
          parentDataKey: null
        },
        {
            label: "회사명",
            dataKey: "company_name",
            type: "text",
            parentDataKey: "career"
        },       {
            label: "직무",
            dataKey: "role",
            type: "text",
            parentDataKey: "career"
        },
        {
            label: "입사일",
            dataKey: "start_date",
            type: "date",
            parentDataKey: "career"
        },
        {
            label: "퇴사일",
            dataKey: "end_date",
            type: "date",
            parentDataKey: "career"
        }
  ];
}

module.exports = {
  createValueStructures
};
