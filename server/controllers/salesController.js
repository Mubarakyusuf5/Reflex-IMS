const Sales = require("../models/salesModel");
const Products = require("../models/productModel");

const createSale = async (req, res) => {
  try {
    for (const item of req.body.itemSales) {
      const productId = item.product;
      const quantitySold = item.quantity;

      const product = await Products.findById(productId);

      
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` });
      }

      if (product.inStock === 0) {
        return res.status(400).json({ message: `Insufficient stock for product ${product.productName}` });
      }

      if (quantitySold > product.inStock) {
        return res.status(400).json({
          message: `Cannot create sale. Requested quantity (${quantitySold}) exceeds available stock (${product.inStock}) for product ${product.productName}.`,
        });
      }
    }

    const newsale = await Sales.create(req.body);

    for (const item of req.body.itemSales) {
      const productId = item.product;
      const quantitySold = item.quantity;

      await Products.findByIdAndUpdate(
        productId,
        { $inc: { inStock: -quantitySold } }, 
        { new: true } 
      );
    }

    res.status(201).json({ message: "Sale created successfully", newsale });
  } catch (error) {
    res.status(500).json({ message: "Error creating Sale", error });
  }
};



const displaySale = async (req, res) => {
  try {
    const sale = await Sales.find();
    // sale.date = sale.date.toISOString().split("T")[0];
    res.status(200).json(sale);
} catch (error) {
    res.status(500).json({ message: "Error fetching Sales", error  });
}
};

const displaySaleById = async (req, res) => {
  try {
    const sale = await Sales.find();
    res.status(200).json(sale);
} catch (error) {
    res.status(500).json({ message: "Error fetching Sales", error  });
}
};

const updateSale = async (req, res) => {
  try {
    const updatedSale = await Sales.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({message: "sale updated successfully ",updatedSale});
} catch (error) {
    res.status(500).json({ message: "Error updating Sales", error  });
}
};

const deleteSale = async (req, res) => {
  try {
        const deletedSale = await Sales.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "sale deleted successfully", deletedSale });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Sales", error  });
    }
};

module.exports = {
  createSale,
  displaySale,
  displaySaleById,
  updateSale,
  deleteSale,
};
