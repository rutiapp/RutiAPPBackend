const { authJwt } = require("../middleware");
const exersiseController = require("../controllers/exersises.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/exersises/create",
    [authJwt.verifyToken],
    exersiseController.create
  );
  app.get(
    "/api/exersises/findAllByCreator/:creatorId",
    [authJwt.verifyToken, authJwt.isAdmin],
    exersiseController.findAllByCreator
  );

  app.get(
    "/api/exersises/findAll",
    [authJwt.verifyToken, authJwt.isAdmin],
    exersiseController.findAll
  );
};