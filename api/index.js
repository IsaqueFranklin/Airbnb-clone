const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();

require('dotenv').config();


app.use(express.json());

const salt = bcrypt.genSaltSync(10);
const secret = 'lkanlskfnalksnflajsdnflkjdnfklajdsnflk';

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL).then((response) => {
    console.log('Mongo conectado.')
}).catch(err => {
    console.log('Erro ao conectar.')
    console.log('Erro: '+err);
})

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

app.post('/login', async (req, re) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email})

    if(userDoc) {
        res.json('fuond')
    } else {
        res.json('not found')
    }
})

app.listen(4000);