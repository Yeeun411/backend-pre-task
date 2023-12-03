module.exports = (sequelize, DataTypes) => {
  const profile_card = sequelize.define("profile_card", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
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

  profile_card.associate = (profile_cards) => {
    // define associate if necessary...
    profile_card.hasMany(profile_cards.career_field, { 
      as: 'career_fields',
      foreignKey: 'profile_id',
      onDelete: 'CASCADE',
      hooks: true
    });
  
    profile_card.hasMany(profile_cards.profile_field, { 
      as: 'profile_fields',
      foreignKey: 'profile_id',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  

  return profile_card;
};
