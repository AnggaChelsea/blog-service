const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chartSchema = new schema({
  productId: 
    {
      type: schema.Types.ObjectId,
      ref: "products",
    },
  
  userId: {
    type: schema.Types.ObjectId,
    ref: "users",
  },
  quantity: { type: Number },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const exportSchema = mongoose.model("Chart", chartSchema);
module.exports = exportSchema;
