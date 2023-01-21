const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    subTitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
const story = mongoose.model('story', storySchema);
module.exports = story;