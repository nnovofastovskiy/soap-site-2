// роутинг управления складом
const {Router} = require("express");
const controller = require("./stock.controller");

const router = Router();

// получить всё что есть
router.get("/", controller.readStock);

// получить склад по конкретному товару
router.get("/:id", controller.readStockByProductId);

// установить значение для товара
router.post("/setProduct", controller.setStockValueForProduct);

// сброс значения для товара
router.post("/resetProduct/:id", controller.resetStockValueForProduct);

// увеличить на 1
router.post("/incrementProduct/:id", controller.incrementStock);

// увеличить на значение
router.post("/increaseProduct", controller.increaseStock);

// уменьшить на 1
router.post("/decrementProduct/:id", controller.decrementStock);

// уменьшить на значение
router.post("/decreaseProduct", controller.decreaseStock);


module.exports = router;