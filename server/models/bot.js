module.exports = (sequelize, DataTypes) => {
  const Bot = sequelize.define('Bot', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Bot name taken. Please choose another!',
      },
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
      defaultValue: 0,
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
