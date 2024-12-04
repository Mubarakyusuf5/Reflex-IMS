const express = require("express");
const router = express.Router();
const {
    createSale,
    displaySale,
    displaySaleById,
    updateSale,
    deleteSale,
  } = require("../controllers/salesController");
  const { VerifyToken } = require("../middlewares/jwt.js");
  const authorizeRoles = require("../middlewares/RoleMiddleware.js");

  router.post("/createSale",
     VerifyToken, authorizeRoles("admin", "user"),
      createSale);
  router.put("/updateSale/:id", 
    VerifyToken, authorizeRoles("admin", "user"), 
    updateSale);
  router.delete("/deleteSale/:id", 
    VerifyToken, authorizeRoles("admin", "user"), 
    deleteSale);
  router.get("/displaySale", 
    VerifyToken, authorizeRoles("admin", "user"), 
    displaySale);
  router.get("/displaySale/:id", 
    VerifyToken, authorizeRoles("admin", "user"), 
    displaySaleById);
  
  
  module.exports = router;