const mongoose = require('mongoose');
const schema = mongoose.Schema;
// mongoose schema
const replyCommentSchema = new schema({
    commentId:{
        type: schema.Types.ObjectId,
        ref: 'products'
    },
    message: {
        type: String,
    },
    userId: {
        type: schema.Types.ObjectId,
        ref: 'users'
    }
});

const ReplyComment = mongoose.model('replycomment', replyCommentSchema);
module.exports = ReplyComment;