const db = require("../models")
const Weights = db.weight
const Exersises = db.exersise
const Op = db.Sequelize.Op
// Create and Save a new Weight
exports.create = (req, res) => {

    // Validate request
  if (!req.body.quantity_kg) {
    res.status(400).send({
      message: "La cantidad no puede estar vacio"
    });
    return;
  }

  //validate token
  // Create a Exersise
  const weight = {
    quantity_kg: req.body.quantity_kg,
    userId: req.body.userId,
    exersiseId: req.body.exersiseId
  };
  // Save Exersises in the database
  Weights.create(weight)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Weight."
      });
    });
  
};

exports.findAll = (req, res) => {
    Weights.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weights."
      });
    });
};

// Retrieve all Weights from the database.
exports.findAllByUserAndExersise = (req, res) => {
  const userId = req.params.userId;
  const exersiseId = req.params.exersiseId;
  var condition = { userId: userId, exersiseId: exersiseId }
  var order = 
    ['createdAt', 'DESC']
  
  Weights.findAll({ where: condition,order:[order]
                     })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weights."
      });
    });
  
};

// Find last weight added to exersise
exports.findLastByUserAndExersise = (req, res) => {
  const userId = req.params.userId;
  const exersiseId = req.params.exersiseId;
  var condition = { userId: userId, exersiseId: exersiseId }
  var order = 
    ['createdAt', 'DESC']
  
  Weights.findOne({ where: condition,order:[order]
                     })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weights."
      });
    });
  
};
// Find a single weight with an id
exports.findById = (req, res) => {
const id = req.params.id;
  Exersises.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Exersise with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Exersise with id=" + id
      });
    });
  
};

//find all weights by user order by creation
exports.findLastByUser = (req, res) => {
  const userId = req.params.userId;
  var condition = { userId: userId }
  var order = 
    ['createdAt', 'DESC']
  Weights.findAll({ where: condition,order:[order],limit:10,
      include: [{
      model: Exersises,
      as: 'exersise',
      attributes:['name','createdAt']}]
                     })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weights."
      });
    });
  
};