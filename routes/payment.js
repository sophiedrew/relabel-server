const { resolve } = require("path");
const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const Receipt = require("../models/Receipt.model");
const User = require("../models/User.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

// This is your real test secret API key.
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.use(express.static("."));
router.use(express.json());

router.post("/create-payment-intent", isLoggedIn, async (req, res) => {
  /* console.log("body in payment", req.body);
  console.log("items from body in payment", req.body.products); */

  const productIds = req.body.products.map((el) => el.id);
  //console.log(productIds);

  Product.find({ _id: productIds }).then((returnedProducts) => {
    //console.log("returned products from backend", returnedProducts);
    const totalPrice = returnedProducts.reduce((acc, el) => {
      return acc + el.price; //!!! numberOfOrderedProducts (instead) of quantity which is coming from frontend, check if product IDs are equal. OR create receipt first with prices from Backend???
    }, 0);

    console.log(totalPrice);
    stripe.paymentIntents
      .create({
        amount: totalPrice,
        currency: "eur",
      })
      .then((paymentIntent) => {
        //console.log(paymentIntent);
        res.send({ clientSecret: paymentIntent.client_secret });
      })
      .catch((err) => console.log(err));
  });
});

// new Route succesfull payment

router.post("/success", isLoggedIn, (req, res) => {
  const Ids = req.body.products.map((el) => el.id);
  Receipt.create({
    products: req.body.products,
    user: req.user._id,
  }).then((newReceipt) => {
    User.findByIdAndUpdate(req.user._id, {
      $push: { receipts: newReceipt._id },
      new: true,
    })
      .then(() => {
        console.log("DELETE GOT CALLED");
        Product.deleteMany({ _id: { $in: Ids } });
      })
      .then(() => {
        res.json("all good");
      });
  });
});

/* const calculateOrderAmount = (products) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(products),
    currency: "eur",
  });
  //code of what happens after checkout ()
  res.send({
    clientSecret: paymentIntent.client_secret,
  }); */
//});

module.exports = router;
