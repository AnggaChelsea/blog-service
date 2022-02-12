const mongoose = require('mongoose');
require('dotenv').config();
// module.exports = () => {
//     var uristring =
//      process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost:27017/olx_service;"
//     // mongodb+srv://angga:sayangmamah@cluster0.kw3ii.mongodb.net/olx_service?retryWrites=true&w=majority

//     mongoose.connect(uristring, function (err, res) {
//         if (err) {
//             console.log('ERROR connecting to: ' + uristring + '. ' + err);
//         } else {
//             console.log('Succeeded connected to: ' + uristring)
//         }
//     });
// }

const mongodbconnection = () => {
    // mongodb://olx_service:Sayangmamah1@cluster0-shard-00-00.ma8no.mongodb.net:27017,cluster0-shard-00-01.ma8no.mongodb.net:27017,cluster0-shard-00-02.ma8no.mongodb.net:27017/olxseervice?ssl=true&replicaSet=atlas-pjxqhg-shard-0&authSource=admin&retryWrites=true&w=majority
   
    mongoose.connect("mongodb://olx_service:Sayangmamah1@cluster0-shard-00-00.ma8no.mongodb.net:27017,cluster0-shard-00-01.ma8no.mongodb.net:27017,cluster0-shard-00-02.ma8no.mongodb.net:27017/olxseervice?ssl=true&replicaSet=atlas-pjxqhg-shard-0&authSource=admin&retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('MongoDB Connected');
        }
    });
}

module.exports = mongodbconnection;