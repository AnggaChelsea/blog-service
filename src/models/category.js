const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon:{
        type:String
    },
    color:{
        type:String
    }
})
categorySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
categorySchema.set('toJSON', {
    virtuals: true
});
const categories = mongoose.model('categories', categorySchema);
categories.schema.path('name').validate(function(value){
   return categories.findOne({name:value}).then(function(category){
         if(category){
              return false;
         }
         return true;
    });
}, 'Categiry already exists');

module.exports = categories;