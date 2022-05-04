const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chartSchema = new schema({
    productId : {
        type: schema.Types.ObjectId,
        ref: 'Product'
    },
    userId : {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
})
const exportSchema = mongoose.model('Chart', chartSchema);
module.exports = exportSchema;