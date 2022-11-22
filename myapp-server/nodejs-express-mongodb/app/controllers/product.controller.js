const db = require("../models");
const Product = db.product;

// Create and Save a new Product
exports.create = (req, res) => {
  console.log('CREATE :: res.body :: ' + JSON.stringify(req.body));
    // Validate request
  if (!req.body.productName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Product
  const product = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productCategory: req.body.productCategory,
    //productImage: req.body.productImage,
  });

  // Save Product in the database
  product
    .save(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {

    const productName = req.query.productName;
    var condition = productName ? { productName: { $regex: new RegExp(productName), $options: "i" } } : {};

    Product.find(condition)
      .then(data => {
        res.send(data);

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  console.log('SERVER UPDATE :: ',req)
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  console.log(id)

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Product was not found!`
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  
};

