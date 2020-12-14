const router = require("express").Router();
const Receipt = require("../models/Receipt.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/new-receipt", isLoggedIn, (req, res) => {
  const { user, createdAt, products } = req.body;
  Receipt.create({
    user,
    createdAt,
    products,
  }).then((newReceipt) => {
    res.json(newReceipt);
  });
});

module.exports = router;
