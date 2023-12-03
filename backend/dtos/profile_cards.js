class ProfileCardCreateDto {
  constructor(name) {
    this.name = name;
  }
}

class ProfileCardResponseDto {
    constructor(value, valueStructures) {
      this.value = value;
      this.valueStructures = valueStructures;
    }
  }
  
  class ProfileCardUpdateDto {
    constructor({ parentDataKey, itemIndex, newValue }) {
        this.parentDataKey = parentDataKey;
        this.itemIndex = itemIndex;
        this.newValue = newValue;
    }
}


class ProfileFieldDto {
    constructor(field) {
        this[field.field_key] = field.field_value;
    }
}

class CareerFieldDto {
    constructor(careerField) {
        this[careerField.company_name] = {
        role: careerField.role,
        startDate: careerField.start_date,
        endDate: careerField.end_date
        };
    }
}

class ValueStructureDto {
    constructor({ label, dataKey, type, parentDataKey }) {
        this.label = label;
        this.dataKey = dataKey;
        this.type = type;
        this.parentDataKey = parentDataKey;
    }
}


module.exports = {
    ProfileCardCreateDto,
    ProfileCardResponseDto,
    ProfileCardUpdateDto,
    ProfileFieldDto,
    CareerFieldDto,
    ValueStructureDto
  };