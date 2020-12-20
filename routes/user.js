const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const {
    sendWelcomEmail
} = require('../util/email');


router.post('/', async (req, res) => {

    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) return res.status(400).send("User already registered.");
        user = new User(_.pick(req.body, ["_id", "name", "email", "password","isAdmin"]));
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();

        await sendWelcomEmail(user.email, user.name)

        const token = user.generateAuthToken();
        res.header("auth-token", token).header("access-control-expose-headers", "auth-token")
            .send(_.pick(user, ["_id", "name", "email"]));
    } catch (error) {
        res.status(404).send("Invalid details")
    }
});

module.exports = router;