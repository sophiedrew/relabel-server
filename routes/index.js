const router = require("express").Router();
const authRoutes = require("./auth");
const profileRoutes = require("./profile");
const productRoutes = require("./products");
const checkoutRoutes = require("./checkout");
const paymentRoutes = require("./payment");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/product", productRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/payment", paymentRoutes);

module.exports = router;
