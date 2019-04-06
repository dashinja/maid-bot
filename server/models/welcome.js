module.exports = (sequelize, DataTypes) => {
  const Welcome = sequelize.define('Welcome', {
    welcome: {
      type: DataTypes.TEXT,
    },
  })
  return Welcome
}
