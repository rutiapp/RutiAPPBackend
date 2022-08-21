module.exports = (sequelize, Sequelize) => {
    const Exersise = sequelize.define("exersises", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      video_url: {
        type: Sequelize.STRING
      },
      series: {
        type: Sequelize.INTEGER
      },
      repetitions: {
        type: Sequelize.INTEGER
      },
      help_url: {
        type: Sequelize.STRING
      }

    });
    return Exersise;
  };