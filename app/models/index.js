const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//import models that need define a relationship
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.rutine = require("../models/rutine.model.js")(sequelize, Sequelize);
db.exersise = require("../models/exersise.model.js")(sequelize, Sequelize);
db.weight = require("../models/weight.model.js")(sequelize, Sequelize);

//Many to Many relationship user-roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//Many to Many relationship user-rutines
db.rutine.belongsToMany(db.user, {
  through: "user_rutines",
  foreignKey: "rutineId",
  otherKey: "userId"
});
db.user.belongsToMany(db.rutine, {
  through: "user_rutines",
  foreignKey: "userId",
  otherKey: "rutineId"
});

//Many to Many relationship rutine-exersises
db.exersise.belongsToMany(db.rutine, {
  through: "rutine_exersises",
  foreignKey: "exersiseId",
  otherKey: "rutineId"
});
db.rutine.belongsToMany(db.exersise, {
  through: "rutine_exersises",
  foreignKey: "rutineId",
  otherKey: "exersiseId"
});

//One to one relationship weight-user
db.weight.belongsTo(db.user);

//One to one relationship weight-user
db.exersise.belongsTo(db.user, {
  as: "creator"
});

//One to one relationship weight-exersise
db.weight.belongsTo(db.exersise);

db.ROLES = ["user", "admin"];
module.exports = db;