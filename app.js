const express = require('express');
const mongoose = require('mongoose');
const shop = require('./routes/shop');
const admin = require('./routes/admin');
const auth = require("./routes/auth");
const user = require('./routes/user');
const Sadmin = require('./routes/sAdmin');
const multer = require('multer');
const app = express();


mongoose.connect('mongodb://localhost/shop1')
    .then(() => console.log('Database is Connected...'))
    .catch(() => console.log("Database is not Conncted"));


app.use(express.json());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + '-' + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter
    }).single('image')
);


app.use('/shopforu/shop', shop);
app.use('/shopforu/admin', admin);
app.use('/shopforu/user', user);
app.use('/shopforu/auth', auth);
app.use('/shopforu/sadmin',Sadmin);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening Port ${port}...`))