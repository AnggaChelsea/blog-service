const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon:{
        type:String
    },
    color:{
        type:String
    }
})

const categories = mongoose.model('categories', categorySchema);
module.exports = categories;