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
    alamat: {
        type: String,
        required: true,
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
        required: true,
    },
    baru: {
        type: String,
        required: true,
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
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0,
    },
    view: [{
        type: schema.Types.ObjectId,
        ref: 'users'
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