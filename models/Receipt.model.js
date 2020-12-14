const { Schema, model } = require("mongoose");

const receiptSchema = new Schema({
  products: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Receipt = model("Receipt", receiptSchema);

module.exports = Receipt;
