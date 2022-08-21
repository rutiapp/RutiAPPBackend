module.exports = (sequelize, Sequelize) => {
    const Rutine = sequelize.define("rutines", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      goal: {
        type: Sequelize.STRING
      },
      days: {
        type: Sequelize.INTEGER
      }

    });
    return Rutine;
  };