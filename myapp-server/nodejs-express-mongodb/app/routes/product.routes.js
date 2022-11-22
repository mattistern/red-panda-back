  const express = require("express");
  const router = express.Router();
  const products = require("../controllers/product.controller.js");

  // Create a new product
  router.post('/', products.create);
  router.get('/', products.findAll);
  router.put('/', products.update);

 

  module.exports = router
