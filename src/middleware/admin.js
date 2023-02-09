const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "sayangmamah");
        console.log(decoded);
        if(decoded.name === "premium" || decoded.name === "free"){
            res.status(403).json({message:'access denied just for admin'})
        }else{
            req.userData = decoded;
            next();
        }
    }catch{
        return res.status(401).json({message: "Auth failed"})
    }
}