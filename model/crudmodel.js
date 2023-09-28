module.exports = (sequelize, DataTypes) => {
  const crud = sequelize.define("info", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // image: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
  return crud;
};
