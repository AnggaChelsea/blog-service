const mongoose = require('mongoose');

module.exports = () => {
    var uristring =
    process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/service_olx';
    // mongodb+srv://angga:sayangmamah@cluster0.kw3ii.mongodb.net/olx_service?retryWrites=true&w=majority
    mongoose.connect(uristring, function(err, res){
        if (err) {
            console.log('ERROR connecting to: ' + uristring + '. ' + err);
        }else{
            console.log('Succeeded connected to: ' + uristring)
        }
    });
}

