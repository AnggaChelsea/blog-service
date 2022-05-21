const mongoose = require('mongoose');
const schema = mongoose.Schema

const checkoutSchema = new schema({
    cartid: [{
            cartid: {
                type: schema.Types.ObjectId,
                ref: 'Cart'
            }
        },
        {
            cartid: {
                type: schema.Types.ObjectId,
                ref: 'Cart'
            }
        }

    ],
    userId: {
        type: schema.Types.ObjectId,
        ref: 'users'
    }
})

const createCheckout = mongoose.model('checkoutlist', checkoutSchema)
module.exports = createCheckout;