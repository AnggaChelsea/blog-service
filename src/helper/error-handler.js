function errorHandler(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        //jwt autentication error
      return  res.status(401).json({message:"this user is not authorized"});
    }
    if(err.name === 'ValidationError') {
       return res.status(400).json({message:err.message});
    }
    return res.status(500).json({message:err.message});
}