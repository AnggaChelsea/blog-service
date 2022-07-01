const mongoode = require('mongoose');
const Schema = mongoode.Schema;

const commentSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  comment: {
    type: String,
    required: true
  }
})

const exportComment = mongoode.model('comments', commentSchema);
module.exports = exportComment;