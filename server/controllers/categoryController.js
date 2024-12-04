const Categories = require("../models/categoryModel");

const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const exist = await Categories.findOne({ categoryName });
    
        if (exist) {
          return res.status(409).json({ message: "Supplier already exists" });
        } else {
          // Create a new supplier
          const newCategory = await Categories.create(req.body);
          res.status(201).json({ message: "Category created successfully", newCategory });
        }
      } catch (error) {
        res.status(500).json({ message: "Error creating Category", error });
      }
};

const displayCategory = async (req, res) => {
    try {
        const category = await Categories.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Categories", error });
    }
};

const displayCategoryById = async (req, res) => {
    try {
        const categoryId = await Categories.findById(req.param.id);
        res.status(200).json(categoryId);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Categories", error });
    }
};

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Categories.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({message: "Category updated successfully ",updatedCategory});
    } catch (error) {
        res.status(500).json({ message: "Error updating Category", error });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Categories.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Category", error });
    }
};

module.exports = {
    createCategory,
    displayCategory,
    displayCategoryById,
    updateCategory,
    deleteCategory,
};
