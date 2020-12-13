const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");

const router = require("express").Router();

router.get("/:id", isLoggedIn, (req, res) => {
  User.findById(req.params.id).then((user) => {
    res.json(user);
  });
});

router.put("/:id", isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (userUpdated) => {
      res.json({ message: "all good", userUpdated });
    }
  );
});

module.exports = router;
