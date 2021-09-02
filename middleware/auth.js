const jwt = require('jsonwebtoken');
const client = require('../models/db.js');


// protecting our routs
exports.protect = async (req, res, next)=>{
    let authorized = false;
    let token;
    let user_id;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.token)
    {
        token = req.cookies.token;
    }else{
        return next(new Error('Unauthorized Access.'));
    }

    try{
        user_id = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    }catch(e)
    {
        return next(e);
    }


}