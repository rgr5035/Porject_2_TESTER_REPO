module.exports = (sequelize, DataTypes) => {
  const GiftItem = sequelize.define("GiftItem", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
        len: [1],
    },
  });

  GiftItem.associate = (models) => {
    GiftItem.belongsTo(models.ListMember, {
      foreignKey: {
        allowNull: false, 
      },
    });
  };

  return GiftItem;
};
