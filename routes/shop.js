const  Product  = require("../models/product");
const Order = require('../models/order');
const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();



router.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products);
  });

router.get('/cart', auth, async (req, res) => {
  try {
    const product = await req.user.populate('cart.items.productId').execPopulate()
    console.log(product)
    res.send(product)
  } catch (error) {
    console.log('invalid details');
  }
});


router.delete('/cart-delete', auth, async (req, res)=> {
try {
  const product = await req.user.removeFromCart(req.body.productId);
  res.status(200).send(product);
}
catch(err){
  console.log('invalid details');
}
 
})


router.get('/:id', async (req,res)=> {
  const product = await Product.findById(req.params.id);
  if (!product)
  return res.status(404).send("The movie with the given ID was not found.");
  res.send(product);
});


router.post('/add-cart', auth, async (req,res)=> {
  try {
    const product = await Product.findById(req.body.productId);
      req.user.addToCart(product);
      res.status(200).send(product);
  }
  catch(err) {
    res.status(404).send(err);
  }
});



router.post('/create-order', auth, async (req, res)=> {

try {
const user = await req.user.populate('cart.items.productId').execPopulate();
const products = await user.cart.items.map(i => {
  return { quantity: i.quantity, product: { ...i.productId } };
});
const order = new Order({
  user: {
    email: req.user.email,
    userId: req.user
  },
  products: products
});
 order.save();
await req.user.clearCart();
}

catch(err) {
  console.log("invalid details");
}
});


module.exports = router
  