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

router.get("/all-products", (req, res, next) => {
  Product.find().then((allProducts) => {
    res.json(allProducts);
  });
});

router.get("/:id", (req, res) => {
  Product.findById(req.params.id).then((SingleProduct) => {
    res.json(SingleProduct);
  });
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id).then((deletedProduct) => {
    res.json({ message: "Product successfully deleted" });
  });
});

router.put("/edit/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (productUpdated) => {
      res.json({ productUpdated });
    }
  );
});

module.exports = router;
