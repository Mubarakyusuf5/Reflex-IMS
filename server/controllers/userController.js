const Users = require("../models/userModel");
const {
  hashPassword,
} = require("../middlewares/hash.js");

const displayUser = async (req, res) => {
    try {
      const user = await Users.find({});
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Users" });
    }
  };


  const updateUser = async (req, res) => {
    try {
      const { fullname, username, email, password, role } = req.body;
  
      // Validate fields
      // if (!fullname || !username || !email || !password) {
      //   return res.status(400).json({ message: "All fields are required" });
      // }
  
      // Hash password before updating if it's provided
      const updatedData = { fullname, username, email, role };
      if (password) {
        updatedData.password = await hashPassword(password);
      }
  
      const updatedUser = await Users.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      // if (!updatedUser) {
      //   return res.status(404).json({ message: "User not found" });
      // }
  
      res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating User", error });
    }
  };

const deleteUser = async (req, res)=>{
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "user deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
}


  module.exports = {
    displayUser,
    // displayUserById,
    updateUser,
    deleteUser,
  };