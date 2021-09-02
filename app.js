const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const colors = require('colors');
const app = express();
const router = express.Router();
const test = require('./test/test.js');
const client = require('./models/db.js');

//routes
const auth = require('./routes/auth');
const users = require('./routes/users');


const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res)=>{
    res.json({
        message : "Hi"
    });
});

app.use('/api', auth);
app.use('/api', users);

app.use((err, req, res, next)=>{
    res.status(404).json({
        "status" : "error",
        "error details" : err.message
    });
});


app.listen(port, (err)=>{
    if(!err)
    {
        console.log(err);
    }
    console.log(`Node Server In Work...! at ${port}`.green);
});
