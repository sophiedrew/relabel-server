const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  image: String,
  itemNo: String,
  name: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  quantity: Number,
  price: Number,
  size: {
    type: String,
    enum: ["Size XS", "Size S", "Size M", "Size L", "Size XL"],
  },
  colour: String,
  material: String,
  brand: String,
  origin: {
    type: String,
    enum: ["private", "industry"],
  },
  refurbed: String,
  category: {
    type: String,
    enum: ["hoodies", "jackets", "pants", "shirts", "sweater"],
  },
  suitable: String,
});

const Product = model("Product", productSchema);

module.exports = Product;
