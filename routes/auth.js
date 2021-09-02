const express = require('express');
const router = express.Router();

const {
    signUp,
    login,
    logout
} = require('../controllers/auth.js');


router.post('/signup', signUp);
router.post('/login', login);
router.get('/logout', logout);


module.exports = router;