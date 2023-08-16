const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");


router.get("/",productController.test);

// create api
router.post("/products/create",productController.add);

router.get("/products",productController.allProduct);

router.delete("/products/:id",productController.delete);

router.post("/products/:id/update_quantity",productController.update);
module.exports = router;