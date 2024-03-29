const { authJwt } = require("../middleware");
const weightController = require("../controllers/weights.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  }) 
  app.post(
    "/api/weights/create",
    [authJwt.verifyToken],
    weightController.create
  )

  app.get(
    "/api/weights/findWeightsByExersise/:exersiseId",
    [authJwt.verifyToken],
    weightController.findAllByUserAndExersise
  )

  app.get(
    "/api/weights/findLastWeightByExersise/:exersiseId",
    [authJwt.verifyToken],
    weightController.findLastByUserAndExersise
  )

  app.get(
    "/api/weights/findLastWeightsByUser",
    [authJwt.verifyToken],
    weightController.findLastByUser
  )
};