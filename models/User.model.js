const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    userType: String,
    firstName: String,
    lastName: String,
    street: String,
    houseNo: String,
    postalCode: String,
    city: String,
    /* creditCardNo: String,
    creditCardMonth: {
      type: Number,
    },
    creditCardYear: {
      type: String,
    },
    creditCardCVC: String, */

    receipts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Receipt",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
