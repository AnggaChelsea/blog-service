const mongoose = require('mongoose')
const schema = mongoose.Schema
// mongoose schema
const productSchema = new schema({
    seller:{
        type: schema.Types.ObjectId,
        ref: 'users'
    },  
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
        type:String,
        default:0,
    },
    category:{
        type: String,
    },
    countInStock:{
        type:String,
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
    linkButtonMessage: {
        type: String,
        default:'http://localhost:8002/products/messages/'
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
productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set('toJSON', {
    virtuals: true
});
const products = mongoose.model('products', productSchema)
module.exports = products