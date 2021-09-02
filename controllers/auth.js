const jwt = require('jsonwebtoken');
const client = require('../models/db.js');
const {v4: uuidv4} = require('uuid');


// Controller for soving siging up[ option
exports.signUp = async (req, res, next)=>{
    const {username, password} = req.body;
    // console.log(username, password);
    // console.log(client);
    let query = "INSERT INTO users(id, username, password) ";
    query += `VALUES ($1, $2, $3) RETURNING *`;

    let values = [uuidv4(), username, password];
    try{
        const userAdded = await client.query(query, values);
        const result = userAdded.rows[0];
        // console.log(result.data.id);
       return await getJWT(result, 200, res);

    }catch(e)
    {
        return next(e);
    }

}


// Controller for soving siging up[ option
exports.login = async (req, res, next)=>{
    const {username, password} = req.body;

    if(!username || !password)
    {
        return next(new Error('You must provide both username and password'));
    }

    let query = "SELECT * FROM users WHERE username = $1";

    let values = [username];
    try{
        const userAdded = await client.query(query, values);
        const result = userAdded.rows[0];

        if(!result)
        {
            return next(new Error('This username is not registered.'));
        }
        if(result.password != password)
        {
            return next(new Error('Your password is incorrect.'));
        }
        // console.log(result.data.id);
       return await getJWT(result, 200, res);

    }catch(e)
    {
        return next(e);
    }
}


exports.logout = (req, res, next)=>{
    res.cookie('token', '', {
        expires : new Date(Date.now() + 5 * 1000),
        httpOnly : true
    });

    return res.status(200).json({
        "status" : "successful",
        "message" : "You are logged out successfully"
    });
}


// exports.login = (req, res, next)=>{
//     const {username, password}
// }


async function getJWT(result, status, res){

    const option2 = {
        expires : new Date(Date.now() + 5 * 60 * 1000),
        httpOnly : true
    }

    // console.log(result.id);
    // console.log(process.env.JWT_SECRET_KEY);
    // console.log(result.id);

    const token = await jwt.sign(
        result.id,  
        process.env.JWT_SECRET_KEY
    );
  
    console.log(token);

    return res.status(status)
    .cookie('token',token, option2)
    .json({
        "status" : "successful",
        "user" : result,
        "access_token" : token
    });
}

