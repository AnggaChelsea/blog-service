const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followersSchema = Schema({ 
    followId:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    followersId:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})
followersSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  // Ensure virtual fields are serialised.
  followersSchema.set("toJSON", {
    virtuals: true,
  });

module.exports = mongoose.model('Followers', followersSchema);