const { application } = require('express');
const express = require('express');
const router = express.Router();

// WHAT? :

const {
    signUp,
    login,
    logout
} = require('../controllers/auth.js');

// app.use('/api/signup, );
router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);


module.exports = router;