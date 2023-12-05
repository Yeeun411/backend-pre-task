module.exports = (sequelize, DataTypes) => {
  const career_field = sequelize.define('career_field', {
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
      allowNull: false,
      primaryKey: true,
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  }, {
    tableName: 'career_field',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: false,
    indexes: [{
      unique: true,
      fields: ['profile_id', 'item_index']
    }]
  });

  career_field.associate = (models) => {
    career_field.belongsTo(models.profile_card, { foreignKey: 'profile_id' });
  };

  return career_field;
};
