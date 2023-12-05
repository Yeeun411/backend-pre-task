module.exports = (sequelize, DataTypes) => {
  const profile_field = sequelize.define('profile_field', {
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profile_card', // Ensure this matches the table name as Sequelize sees it
        key: 'id',
      },
    },
    field_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    field_value: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    field_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    field_type: {
      type: DataTypes.STRING(100),
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
    createdAt: false,
    indexes: [{
      unique: true,
      fields: ['profile_id', 'field_key']
    }]
  });

  profile_field.associate = (models) => {
    profile_field.belongsTo(models.profile_card, { foreignKey: 'profile_id' });
  };

  return profile_field;
};
