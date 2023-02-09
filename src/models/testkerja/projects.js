const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    teacherName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0.0,
    },
    totalHours: {
        type: String,
    },
    totalLesson: {
        type: String
    },
    typeStudent: {
        type: String,
    },
    image: {
        type: String
    },
    price: {
        type:Number,
    },
    reviews: {
        type: Number,
        default:0
    }
})
const products = mongoose.model('product-course', productSchema)
module.exports = products