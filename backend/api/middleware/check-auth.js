//author Param Patel
//012421227
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, "jay");
            req.body.created_by = decoded.userId;
            console.log(decoded)
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