const mongoose = require('mongoose')
const schema = mongoose.Schema
// mongoose schema
const productSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDecription: {
        type: String,
        default: ''
    },
    image:{
        type:String,
        default:''
    },
    images : [{
        type:String,
    }],
    brand: {
        type: String,
        default:''
    },
    price: {
        type:Number,
        default:0,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'categories',
        required:true,
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating: {
        type:Number,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    isFeature:{
        type:Boolean,
        default:false,
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
})
const products = mongoose.model('products', productSchema)
module.exports = products