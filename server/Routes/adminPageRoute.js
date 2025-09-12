const express = require("express");
const router = express.Router();
const {
  createCategory,
  displayCategory,
  displayCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const {
  createProduct,
  displayProduct,
  displayProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  createSupplier,
  displaySupplier,
  displaySupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");
const {
  displayUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");

router.post("/createProduct", 
  // VerifyToken, 
            authorizeRoles("admin"),
   createProduct);
router.put("/updateProduct/:id", 
  // VerifyToken, 
           authorizeRoles("admin"),
   updateProduct);
router.delete("/deleteProduct/:id", 
  // VerifyToken,
              authorizeRoles("admin"),
   deleteProduct);
router.get("/displayProduct", 
  // VerifyToken,
           authorizeRoles("admin", "user"),
   displayProduct);
router.get("/displayProduct/:id", 
  // VerifyToken,
           authorizeRoles("admin"),
   displayProductById);

router.post("/createCategory", 
  // VerifyToken, 
            authorizeRoles("admin"), 
  createCategory);
router.put("/updateCategory/:id", 
  // VerifyToken, 
           authorizeRoles("admin"), 
  updateCategory);
router.delete("/deleteCategory/:id", 
  // VerifyToken, 
              authorizeRoles("admin"), 
  deleteCategory);
router.get("/displayCategory", 
  // VerifyToken, 
           authorizeRoles("admin"), 
  displayCategory);
router.get("/displayCategory/:id", 
  VerifyToken, authorizeRoles("admin"), 
  displayCategoryById);

router.post("/createSupplier", 
  VerifyToken, authorizeRoles("admin"), 
  createSupplier);
router.put("/updateSupplier/:id", 
  VerifyToken, authorizeRoles("admin"), 
  updateSupplier);
router.delete("/deleteSupplier/:id", 
  VerifyToken, authorizeRoles("admin"), 
  deleteSupplier);
router.get("/displaySupplier", 
  VerifyToken, authorizeRoles("admin"), 
  displaySupplier);
router.get("/displaySupplier/:id", 
  VerifyToken, authorizeRoles("admin"), 
  displaySupplierById);

router.put("/updateUser/:id", 
  VerifyToken, authorizeRoles("admin"), 
  updateUser);
router.delete("/deleteUser/:id", 
  VerifyToken, authorizeRoles("admin"), 
  deleteUser);
router.get("/displayUser", 
  // VerifyToken, 
           authorizeRoles("admin"), 
  displayUser);


module.exports = router;
