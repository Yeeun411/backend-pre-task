function createValueStructures(profileFields, careerFields) {
    return [
      {
        label: "이름",
        dataKey: "name",
        type: "text",
        parentDataKey: null
      },
      ...profileFields.map(field => ({
        label: field.field_key,
        dataKey: field.field_value,
        type: field.field_type,
        parentDataKey: null
      })),
      {
        label: "경력사항",
        dataKey: null,
        type: "list",
        parentDataKey: null,
        childrenStructures: careerFields.flatMap(careerField => ([
          {
            label: "회사명",
            dataKey: careerField.company_name,
            type: "text",
            parentDataKey: "경력사항"
          },
          {
            label: "직무",
            dataKey: careerField.role,
            type: "text",
            parentDataKey: "경력사항"
          },
          {
            label: "입사일",
            dataKey: careerField.start_date,
            type: "date",
            parentDataKey: "경력사항"
          },
          {
            label: "퇴사일",
            dataKey: careerField.end_date,
            type: "date",
            parentDataKey: "경력사항"
          }
        ]))
      }
    ];
  }

  module.exports = createValueStructures;