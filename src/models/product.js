const mongoose = require('mongoose')
const schema = mongoose.Schema
// mongoose schema
const productSchema = new schema({
    seller: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
    },
    notif: {
        type: Array,
        default: []
    },
    alamat: {
        type: String,
        required: true,
    },
    viewProduct: {
        type: Number,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    like: [{
        userLike: {
            type: schema.Types.ObjectId,
            ref: 'users'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    comment: [{
        userId: {
            type: schema.Types.ObjectId,
            ref: 'users'
        },
        comment: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now
        },
        replyComment: [{
            reply: {
                type: String,
                required: true,
            },
            userId: {
                type: schema.Types.ObjectId,
                ref: 'users'
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
        }],

    }],
    description: {
        type: String,
        required: true,
    },
    richDecription: {
        type: String,
        default: ''
    },
    net: {
        type: String,
    },
    baru: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        default: ''
    },
    harga_jual: {
        type: String,
        required: true,
    },
    harga_beli: {
        type: String,
        required: true,
    },
    category: {
        type: schema.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
    countInStock: {
        type: String,
        min: 0,
        max: 255
    },
    harga_sewa: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    view: [{
        userId: {
            type: schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    isFeature: {
        type: Boolean,
        default: false,
    },
    linkButtonMessage: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    pesan: []
})
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set('toJSON', {
    virtuals: true
});
const products = mongoose.model('products', productSchema)
module.exports = products