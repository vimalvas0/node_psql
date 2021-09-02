const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/auth');
const {secretMessage} = require('../controllers/users');


router.get('/secret', protect, secretMessage );


module.exports = router;