const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");

const router = require("express").Router();

router.get("/update/:id", isLoggedIn, (req, res) => {
  User.findById(req.params.id).then((user) => {
    res.json(user);
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .populate("receipts")
    .then((user) => {
      res.json(user);
    });
});

router.put("/update/:id", isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (userUpdated) => {
      res.json({ userUpdated });
    }
  );
});

module.exports = router;
