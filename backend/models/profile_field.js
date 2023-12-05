module.exports = (sequelize, DataTypes) => {
  const profile_field = sequelize.define('profile_field', {
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profile_card',
        key: 'id',
      },
    },
    item_index: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    field_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    field_value: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    field_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
    ,
    field_type: {
      type: DataTypes.TEXT,
      defaultValue: 'text',
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  }, {
    tableName: 'profile_field',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: false
  });

  profile_field.associate = (profile_fields) => {
    profile_field.belongsTo(profile_fields.profile_card, { foreignKey: 'profile_id' });
  };

  return profile_field;
};

  