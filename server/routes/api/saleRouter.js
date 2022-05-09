// роутер управления скидками
const {Router} = require("express");
const controller = require('../../controllers/api/saleController');

const router = Router();

// REST
// POST - CREATE
router.post("/", controller.createSale);

// GET - READ
router.get("/", controller.readAllSales);

router.get("/:id", controller.readSaleById);

// PUT - UPDATE
router.post("/edit", controller.updateSale);

// DELETE - DELETE
router.post("/delete", controller.deleteSale);

module.exports = router;