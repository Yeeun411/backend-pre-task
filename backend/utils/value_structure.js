function createValueStructures(name, profileFields, careerFields) {
  return [
      {
          label: "이름",
          dataKey: name,
          type: "text",
          parentDataKey: null
      },
      ...profileFields.map(field => ({
          label: field.field_label,
          dataKey: field.field_key,
          type: field.field_type,
          parentDataKey: null
      })),
      {
          label: "경력사항",
          dataKey: "careerFields",
          type: "list",
          parentDataKey: null,
          childrenStructures: careerFields.flatMap(careerField => ([
              {
                  label: "회사명",
                  dataKey: careerField.company_name,
                  type: "text",
                  parentDataKey: "careerFields"
              },
              {
                  label: "직무",
                  dataKey: careerField.role,
                  type: "text",
                  parentDataKey: "careerFields"
              },
              {
                  label: "입사일",
                  dataKey: careerField.start_date,
                  type: "date",
                  parentDataKey: "careerFields"
              },
              {
                  label: "퇴사일",
                  dataKey: careerField.end_date,
                  type: "date",
                  parentDataKey: "careerFields"
              }
          ]))
      }
  ];
}

module.exports = {
  createValueStructures
};
