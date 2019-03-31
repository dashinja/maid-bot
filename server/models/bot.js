module.exports = (sequelize, DataTypes) => {
  const Bot = sequelize.define('Bot', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },

    botType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },

    workDone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    attack: {
      type: DataTypes.INTEGER,
    },

    defense: {
      type: DataTypes.INTEGER,
    },

    speed: {
      type: DataTypes.INTEGER,
    },
  })
  return Bot
}
