module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('profile_field', {
      profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'profile_card',
          key: 'id',
        },
      },
      field_key: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      field_value: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      field_type: {
        type: DataTypes.ENUM('TEXT', 'NUMBER', 'DATE', 'ENUM'),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.TIMESTAMP,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      }
    }, {
      tableName: 'profile_field',
      timestamps: true,
      updatedAt: 'updated_at'
    });
  
    model.associate = (models) => {
      model.belongsTo(models.profile_card, { foreignKey: 'profile_id' });
    };
  
    return model;
  };
  