const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "sayangmamah");
        console.log(decoded);
        if(decoded.name === "free"){
            res.status(403).json({message:'access denied just for premium'})
        }else{
            req.userData = decoded;
            next();
        }
    } catch (error) {
        return res.status(401).json({message: "Auth failed"})
    }
}
