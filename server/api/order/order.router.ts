// API работы с заказами
const {Router} = require("express");
const controller = require('./orderController');
const router = Router();

// оформление заказа
router.post("/confirmOrder", controller.confirmOrder);

// получить заказ по id и email
router.post("/check", controller.checkOrder);

// Отменить заказ по id и email
router.post("/cancel", controller.cancelOrder);

// получить все заказы по email (аккаунт)
router.post("/allByEmail/", controller.allOrdersByEmail);

// для админа
// получить все заказы по email (admin)
router.post("/admin/allByEmail/", controller.adminAllOrdersByEmail);

// обновить статус заказа
router.post("/admin/setStatus", controller.adminSetOrderStatus);

// create
router.post("/admin/create", controller.createOrder);

// read
router.get("/admin/read/:id", controller.readOrderById);

// readAll
router.get("/admin/readAll", controller.readAllOrders);

// update
router.post("/admin/update", controller.updateOrder);

// delete
router.post("/admin/delete", controller.deleteOrder);


module.exports = router;