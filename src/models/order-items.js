const mongoose = require('mongoose')

const orderItems = mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products',
    }
})
orderItems.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
orderItems.set('toJSON', {
    virtuals: true
});
const Order = mongoose.model('orderitems', orderItems)
module.exports = Order