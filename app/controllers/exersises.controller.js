const db = require("../models");
const Exersises = db.exersise;
const Weights = db.weight
const Op = db.Sequelize.Op;
// Create and Save a new Exersise
exports.create = (req, res) => {

    // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "El nombre no puede estar vacio"
    });
    return;
  }

  //validate token
  // Create a Exersise
  const exersise = {
    name: req.body.name,
    video_url: req.body.video_url,
    series: req.body.series,
    repetitions: req.body.repetitions,
    help_url: req.body.help_url,
    creatorId: req.body.creatorId
  };
  // Save Exersises in the database
  Exersises.create(exersise)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exersise."
      });
    });
  
};

exports.findAll = (req, res) => {
  Exersises.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exersises."
      });
    });
};

// Retrieve all Exersises from the database.
exports.findAllByCreator = (req, res) => {

  const creatorId = req.query.creatorId;
  var condition = creatorId ? { creatorId: creatorId } : null;
  Exersises.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exersises."
      });
    });
  
};
// Find a single Exersise with an id
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
// Update a Exersise by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Exersise with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Exersise from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Exersise
exports.findAllPublished = (req, res) => {
  
};