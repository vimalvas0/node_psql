

exports.secretMessage = (req, res, next)=>{
    const user = req.user;

    res.json({
        status : 'granted',
        message : `This is secret message to ${user.name}`,
        your_info : user
    });
}

