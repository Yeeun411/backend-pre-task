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
      company_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      updated_at: {
        type: DataTypes.TIMESTAMP,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
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
  