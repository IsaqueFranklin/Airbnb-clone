const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs')
const app = express();
require('dotenv').config();

//Salt and jwt secret

const salt = bcrypt.genSaltSync(10);
const jwtSecret = 'minhavelhacomproumeujantarsopauvanozespãodorminocomsaladadenaturmeterlinsonfilinhodonordestepintorcearensedopintoraustriaco.';

//Middlewares

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

//MongoDb databse connection

mongoose.connect(process.env.MONGO_URL).then((response) => {
    console.log('Mongo conectado.')
}).catch(err => {
    console.log('Erro ao conectar.')
    console.log('Erro: '+err);
})

//Route endpoints

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, salt),
        });
    
        res.json(userDoc);
    } catch(e) {
        res.status(422).json(e);
        console.log(e);
    }
}) 

app.post('/login', async (req, res) => {
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
        jwt.sign({
            email:userDoc.email,
            id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json(userDoc);
        });
        } else {
        res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});


app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now()+'.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newName,
    });
    const novaNome = await newName;
    res.json(novaNome);
})

//Multer middleware configuration for image upload
const photosMiddleware = multer({dest:'uploads/'});

app.post('/upload', photosMiddleware.array('photos', 100),(req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
})

app.post('/places', (req, res) => {

    const {token} = req.cookies;
    const {
        title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests
        });
        res.json(placeDoc);
    });
})

//Init server

app.listen(4000);