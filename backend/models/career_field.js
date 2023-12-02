module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('career_field', {
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
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    updatedAt: 'updated_at'
  });

  model.associate = (models) => {
    model.belongsTo(models.profile_card, { foreignKey: 'profile_id' });
  };

  return model;
};
