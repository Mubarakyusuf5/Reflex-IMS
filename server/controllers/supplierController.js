const Suppliers = require("../models/supplierModel");

const createSupplier = async (req, res) => {
  try {
    const { supplierName } = req.body;
    const exist = await Suppliers.findOne({ supplierName });

    if (exist) {
      return res.status(409).json({ message: "Supplier already exists" });
    } else {
      // Create a new supplier
      const newSupplier = await Suppliers.create(req.body);
      res.status(201).json({ message: "Supplier created successfully", newSupplier });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating Supplier", error });
  }
};

const displaySupplier = async (req, res) => {
    try {
        const supplier = await Suppliers.find();
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Suppliers" });
        console.log(error);
    }
};

const displaySupplierById = async (req, res) => {
    try {
        const supplier = await Suppliers.findById(req.param.id);
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Suppliers" });
        console.log(error);
    }
};

const updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await Suppliers.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({message: "Supplier updated successfully ",updatedSupplier});
    } catch (error) {
        res.status(500).json({ message: "Error updating Supplier" });
        console.log(error);
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await Suppliers.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Supplier deleted successfully", deletedSupplier });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Supplier" });
        console.log(error);
    }
};

module.exports = {
  createSupplier,
  displaySupplier,
  displaySupplierById,
  updateSupplier,
  deleteSupplier,
};
