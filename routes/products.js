const router = require("express").Router();
const Product = require("../models/Product.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/new", isLoggedIn, (req, res) => {
  const {
    image,
    itemNo,
    name,
    createdAt,
    quantity,
    price,
    size,
    colour,
    material,
    brand,
    origin,
    refurbed,
    category,
    suitable,
  } = req.body;
  Product.create({
    image,
    itemNo,
    name,
    createdAt,
    quantity,
    price,
    size,
    colour,
    material,
    brand,
    origin,
    refurbed,
    category,
    suitable,
  }).then((newProduct) => {
    res.json(newProduct);
  });
});

module.exports = router;
