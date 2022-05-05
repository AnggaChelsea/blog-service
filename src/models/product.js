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
    alamat: [
        {
          kecamatan:{type: String},
          kota:{type: String},
          provinsi:{type: String},
          kode_pos:{type: String},
        }
      ],
    like: [],
    comment: [],
    description: {
        type: String,
        required: true,
    },
    richDecription: {
        type: String,
        default: ''
    },
    net:{
        type: Boolean,
        required: true,
    },
    baru: {
        type: Boolean,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    images : [{
        type:String,
    }],
    brand: {
        type: String,
        default:''
    },
    harga_jual: {
        type:String,
        required: true,
    },
    harga_beli:{
        type:String,
        required: true,
    },
    category:{
        type: schema.Types.ObjectId,
        ref: 'category',
        required: true,
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
        default:''
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