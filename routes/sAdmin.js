const Product = require("../models/product");
const auth = require('../middleware/auth')
const Sadmin = require('../middleware/sAdmin');
const express = require("express");
const path = require('path');
const _ = require('lodash')
const router = express.Router();


router.get('/', auth,Sadmin, async (req, res) => {
  const products = await Product.find();
  console.log(products);
  res.send(products);
});


router.put('/:id',auth,Sadmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
      }
    });
    res.send(product);
  } catch (error) {
    res.status(404).send("Invalid Details");
  }
});

router.delete('/:id',auth,Sadmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product)
      return res.status(404).send("The movie with the given ID was not found.");
      res.send(product);
  } catch (error) {
    res.status(404).send("Invalid details")
  }
});

router.get('/:id',auth,Sadmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The movie with the given ID was not found.");
    res.send(product);
});



module.exports = router