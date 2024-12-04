const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema(
  {
    itemSales: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        profit: {
          type: Number,
          // required: true,
        },
        subTotal: {
          type: Number,
          required: true,
        },
        overallProfit: {
          type: Number,
          // required: true,
        },
      },
    ],
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    modeOfPayment: {
      type: String,
      required: true,
    },
    overallTotal: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model("Sale", SalesSchema);

module.exports = Sales;
