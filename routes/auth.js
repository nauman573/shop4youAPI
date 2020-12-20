const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const User = require("../models/user");



router.post('/', async (req, res) => {
    try {
       
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');
  
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');
        const token = user.generateAuthToken();
        // res.send(token);
        res.send(token);
      }

    catch(error) {
        res.status(404).send("Invalid details")
    }
    
  });

module.exports = router ;
  