const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv')
//using .env variables
dotenv.config()
var corsOptions = {
  origin: process.env.FRONT_APP
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
require('./app/routes/auth.routes')(app);
require('./app/routes/exersise.routes')(app);
require('./app/routes/weight.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// mapping DB
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Role.create({
    id:1,
    name: "user"
  });
  Role.create({
    id:2,
    name: "admin"
  });
}