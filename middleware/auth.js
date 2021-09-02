const jwt = require('jsonwebtoken');
const client = require('../models/db.js');


// protecting our routs
exports.protect = async (req, res, next)=>{
    let authorized = false;
    let token;
    let user_id;
    let user;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.token)
    {
        token = req.cookies.token;
    }else{
        return next(new Error('Unauthorized Access.'));
    }

    console.log(process.env.JWT_SECRET_KEY);

    try{
        user_id = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    }catch(e)
    {
        return next(e);
    }

    let query = "SELECT * FROM users WHERE id = $1";
    let values = [user_id];

    try{
        user = await client.query(query, values);
    }catch(e)
    {
        return next(e);
    }

    req.user = user.rows[0];

    next();
}