module.exports = (sequelize, Sequelize) => {
    const Weight = sequelize.define("weights", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      quantity_kg: {
        type: Sequelize.DECIMAL(10,1)
      }
    });
    return Weight;
  };