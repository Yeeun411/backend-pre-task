module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define("profile_card", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // define columns...
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },{
    tableName: "profile_card",
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  });

  model.associate = (models) => {
    // define associate if necessary...
    model.hasMany(models.career_field, { 
      as: 'career_fields',
      foreignKey: 'profile_id',
      onDelete: 'CASCADE',
      hooks: true
    });
  
    model.hasMany(models.profile_field, { 
      as: 'profile_fields',
      foreignKey: 'profile_id',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  

  return model;
};
