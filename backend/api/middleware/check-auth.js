//author Param Patel
//012421227
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        try {
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.body.created_by = decoded.id;
            req.body.username = decoded.username // Add to req object
            req.userData = decoded
            next();
            }
        catch(error){
            return res.status(401).json(
                {
                    message:'wrong token',
                    err: error,
                    token: token
                }
            )
        }
        

};