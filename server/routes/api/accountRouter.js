const express = require("express");

const controller = require('../../controllers/api/accountController');

let jsonParser = express.json();

const router = express.Router();

// Администраторские возможности с аккаунтами: REST (CRUD)
// POST - Create
router.post("/", controller.createAccount);

// GET - Read
// информацию об аккаунте может получить авторизованный пользователь
router.get("/:id", controller.readById);

// информацию об аккаунте может получить админ
router.get("/admin/:id", controller.adminReadById);

// PUT - Update
router.post("/edit", controller.edit);

// DELETE - Delete
router.post("/delete", controller.deleteById);


// =================== Additional ===================
// получение мета-данных аккаунта - если сессия авторизована, можно по API получить - email и имя
router.get("/get/meta", controller.getMetadata);

// информацию обо всех аккаунтах может получить только админ
router.get("/admin/get/all", controller.readAll);

// информация обо всех аккаунтах, но поверхностная VM
router.get("/admin/get/allLight", controller.readAllLight);


// =================== Работа с корзиной ===================================
// Работса с корзиной аккаунта через AJAX
// запись данных из LocalStorage в аккаунт - бд - корзину
router.post("/cart/sendCart/", jsonParser, controller.sendCart)

// получение корзины
router.get("/cart/readCart", controller.readCart)

// добавление товара в корзину
router.post("/cart/addToCart/:id", controller.addToCart);

// удаление товара из корзины
router.post("/cart/removeFromCart/:id", controller.removeFromCart);

// очистка корзины
router.post("/cart/clearCart", controller.clearCart);

// оформление заказа
router.post("/cart/confirmOrder", controller.confirmOrder);


// ========================== Работа с закзами =============================
// получить все заказы аккаунта
router.get("/order/getAllOrders", controller.getAllOrders);

// получить конкретный заказ аккаунта
router.get("/order/getOrder/:id", controller.getOrderByAccountId);


// ========================== Работа со списком желаемого ============================
// получить список
router.get("/wishlist/getWishlist", controller.readWishList);

// добавить товар в список
router.post("/wishlist/addToWishlist/:id", controller.addToWishList);

// убрать товар из списка
router.post("/wishlist/removeFromWishlist", controller.removeFromWishList);

// очистить список
router.post("/wishlist/clearWishlist", controller.clearWishList);

module.exports = router;