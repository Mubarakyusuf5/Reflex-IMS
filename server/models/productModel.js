const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  inStock: {
    type: Number,
    required: true,
  },
  buyingPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  supplier: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});

productSchema.pre('save',function (next) {
  this.profit = this.sellingPrice - this.buyingPrice
  next()
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
