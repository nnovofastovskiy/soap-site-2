//  роуты товаров
const { Router } = require("express");
const controller = require('../../controllers/api/productController');
const express = require("express");

const router = Router();
let jsonParser = express.json();

// REST
// POST - CREATE
router.post("/", controller.createProduct);

// GET one by id
router.get("/:id", controller.readProductById);

// GET one by Name
router.get("/name/:name", controller.readProductByName);

// GET ALL (activated)
router.get("/", controller.readAllActivatedProducts);

// GET all in collection by col_Id (activated)
router.get("/inCollection/:id", controller.readAllProductsInCollectionBy_cId);

// GET ALL in collection by col_Name (activated)
router.get("/inCollection/name/:name", controller.readAllProductsInCollectionBy_cName);

// read all products by array of ids
router.post("/get/byArrIds", jsonParser, controller.readAllProductsByArrayOfIds);

// PUT - UPDATE (через POST)
router.post("/edit", controller.updateProduct);

// DELETE - DELETE (через POST)
router.post("/delete", controller.deleteProduct);

// Extended
// read all products
router.get("/get/full", controller.readAll);

// activate one
router.get("/activate/:id", controller.activateProductById);

// deactivate one
router.get("/deactivate/:id", controller.deactivateProductById);

// add sale
router.post("/addSale", controller.addSaleToProduct);

// remove sale
router.post("/removeSale", controller.removeSaleFromProduct);


module.exports = router;