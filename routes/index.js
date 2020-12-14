const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile");
const productRoutes = require("./products");
const checkoutRoutes = require("./checkout");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/product", productRoutes);
router.use("/checkout", checkoutRoutes);

module.exports = router;
