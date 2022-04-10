// // API работы с аккаунтами
// const express = require("express");
// const AccountService = require("../../services/mongodb/accountService");
// const OrderService = require("../../services/mongodb/orderService");
// const LoggerService = require("../../services/loggerService");
// //const MetaService = require("../../services/mongodb/metaService");
// const DeleteService = require("../../services/mongodb/deletedEntityService");
//
// const bcrypt = require("bcryptjs");
//
// //const bodyParser = require("body-parser");
// //let jsonParser = bodyParser.json(); // create application/json parser
//
// let jsonParser = express.json();
//
// // ============= пример кастомного логгера ==============================
// /*
// // создаём объект логгера
// let accountLogger = LoggerService.createCustomLogger("/logs/account.log");
//
// // функция записи в этот логгер
// function accountLoggerWrite (type, message) {
//     try {
//         // Логгер будет записывать только если в meta isLog установлено true
//         if (MetaService.isLog()) {
//             if (type === "info")
//                 accountLogger.info(message);
//             else if (type === "error")
//                 accountLogger.error(message);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }
// */
//
//
//
//
// const router = express.Router();
//
// // Администраторские возможности с аккаунтами: REST (CRUD)
// // POST - Create
// router.post("/", async (req, res) => {
//     try {
//         const { email, name, password } = req.body;
//
//         // проверяем на email
//         const isEmailExists = await AccountService.checkForEmailInDb(email);
//         if (isEmailExists) {
//             const hashPassword = await bcrypt.hash(password, 10);
//
//             const candidate = {
//                 email: email,
//                 name: name,
//                 password: hashPassword
//             };
//
//             const result = await AccountService.createAccount(candidate);
//             //accountLoggerWrite("info", `api/account/[POST] [${email}, ${name}] created`); // пример использования кастомного логгера
//             LoggerService.serverLoggerWrite("info", `api/account/[POST] [${email}, ${name}] created;`);  // общий логгер будет записывать только если Meta.isLog === true
//             res.status(201).json(AccountService.createViewModelFromAccount(result));
//
//         } else {
//             LoggerService.serverLoggerWrite("info", `api/account/[POST] [${email}, ${name}] not created - email already used;`);
//             res.status(200).json({
//                 message: "email already used"
//             });
//         }
//     } catch (e) {
//         LoggerService.serverLoggerWrite("error", `api/account/[POST] error: ${e.message};`);
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
//
// // GET - Read
// // информацию об аккаунте может получить авторизованный пользователь
// router.get("/:id", async (req, res) => {
//     try {
//         const account = await AccountService.readAccount(req.params.id);
//         const accountViewModel = AccountService.createViewModelFromAccount(account);
//
//         // ответ
//         res.status(200).json(accountViewModel);
//
//     } catch (e) {
//         LoggerService.serverLoggerWrite("error", `api/account/:id[GET] error: ${e.message};`);
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // информацию об аккаунте может получить админ
// router.get("/admin/:id", async (req, res) => {
//     try {
//         const account = await AccountService.readAccount(req.params.id);
//         const accountViewModel = AccountService.createViewModelFromAccount(account);
//
//         // ответ
//         res.status(200).json(accountViewModel);
//
//     } catch (e) {
//         LoggerService.serverLoggerWrite("error", `api/account/admin/:id[GET] error: ${e.message};`);
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
//
// // PUT - Update
// router.post("/edit", async (req, res) => {
//     try {
//         const { _id, email, name, password } = req.body;
//
//         const hashPassword = await bcrypt.hash(password, 10);
//
//         const candidate = {
//             _id: _id,
//             email: email,
//             name: name,
//             password: hashPassword
//         };
//
//         const result = await AccountService.updateAccount(candidate);
//         LoggerService.serverLoggerWrite("info", `api/account/edit/[POST] account [${_id}, ${email}, ${name}] updated;`);
//         res.status(200).json(AccountService.createViewModelFromAccount(result));
//
//     } catch (e) {
//         LoggerService.serverLoggerWrite("error", `api/account/edit/[POST] error: ${e.message};`);
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // DELETE - Delete
// router.post("/delete", async (req, res) => {
//     try {
//         const account = await AccountService.readAccount(req.body._id);
//         if (account) {
//             await DeleteService.addEntityToDeleted("account", account);
//             const result = await AccountService.deleteAccountById(req.body._id);
//             if (result) {
//                 LoggerService.serverLoggerWrite("info", `api/account/delete/[POST] account [${req.body._id}] deleted;`);
//                 res.status(200).json({
//                     deletedId: req.body._id
//                 });
//             } else {
//                 res.status(200).json({message:`cant delete account ${req.body._id}`});
//             }
//         } else {
//             LoggerService.serverLoggerWrite("info", `api/account/delete/[POST] account [${req.body._id}] NOT deleted;`);
//             res.status(200).json({
//                 message: "no account by this id"
//             });
//         }
//     } catch (e) {
//         LoggerService.serverLoggerWrite("error", `api/account/delete/[POST] error: ${e.message};`);
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
//
// // Additional
// // получение мета-данных аккаунта - если сессия авторизована, можно по API получить - email и имя
// router.get("/get/meta", async (req, res) => {
//     try {
//         const account = await AccountService.readAccount(req.session.account._id);
//         let answer = {};
//
//         if (account) {
//             answer.email = account.email;
//             answer.name = account.name;
//         }
//         res.status(200).json(answer);
//
//     } catch (e) {
//         LoggerService.serverLoggerWrite("error", `api/account/get/meta/[GET] error: ${e.message};`);
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
//
// // информацию обо всех аккаунтах может получить только админ
// router.get("/admin/get/all", async (req, res) => {
//     try {
//         const accounts = await AccountService.readAllAccounts();
//         const accountsViewModel = [];
//         for (let account of accounts) {
//             accountsViewModel.push(AccountService.createViewModelFromAccount(account));
//         }
//         res.status(200).json(accountsViewModel);
//
//     } catch (e) {
//         LoggerService.serverLoggerWrite("error", `api/account/get/all/[GET] error: ${e.message};`);
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // информация обо всех аккаунтах, но поверхностная VM
// router.get("/admin/get/allLight", async (req, res) => {
//     try {
//         const accounts = await AccountService.readAllAccounts();
//
//         const accountsViewModel = [];
//
//         for (let account of accounts) {
//             accountsViewModel.push(AccountService.createLightViewModelFromAccount(account));
//         }
//
//         res.status(200).json(accountsViewModel);
//
//     } catch (e) {
//         LoggerService.serverLoggerWrite("error", `api/account/get/allLight/[GET] error: ${e.message};`);
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
//
//
//
//
//
//
//
//
// // =================== Работа с корзиной ===================================
//
// // Работса с корзиной аккаунта через AJAX
// // запись данных из LocalStorage в аккаунт - бд - корзину
// router.post("/cart/sendCart/", jsonParser, async (req, res) => {
//     try {
//         const result = await AccountService.syncCartFromLSData(req.session.account._id, req.body);
//         res.status(200).json(result);
//
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// })
//
//
//
// // получение корзины
// router.get("/cart/readCart", async (req, res) => {
//     try {
//         const cart = await AccountService.readCartVMByAccId(req.session.account._id);
//         res.status(200).json(cart);
//
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// })
//
// // добавление товара в корзину
// router.post("/cart/addToCart/:id", async (req, res) => {
//     try {
//         const cart = await AccountService.addToCart(req.session.account._id, req.params.id);
//         res.status(200).json(cart);
//
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // удаление товара из корзины
// router.post("/cart/removeFromCart/:id", async (req, res) => {
//     try {
//         const cart = await AccountService.removeFromCart(req.session.account._id, req.params.id);
//         res.status(200).json(cart);
//
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // очистка корзины
// router.post("/cart/clearCart", async (req, res) => {
//     try {
//         const cart = await AccountService.clearCart(req.session.account._id);
//         res.status(200).json(cart);
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // оформление заказа
// router.post("/cart/confirmOrder", async (req, res) => {
//     try {
//         const orderTemplate = await AccountService.createOrderTemplateFromAccCart(req.session.account._id);
//         const order = await OrderService.createOrder(orderTemplate);
//
//         res.status(200).json(OrderService.createOrderViewModel(order));
//
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
//
//
//
//
// // ========================== Работа с закзами =============================
// // получить все заказы аккаунта
// router.get("/order/getAllOrders", async (req, res) => {
//     try {
//         const ordersId = await AccountService.getOrdersFromAccount(req.session.account._id);
//         let ordersVM = [];
//         for (let orderId of ordersId) {
//             const order = await OrderService.readOrder(orderId);
//             ordersVM.push(OrderService.createOrderViewModel(order));
//         }
//         res.status(200).json(ordersVM);
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // получить конкретный заказ аккаунта
// router.get("/order/getOrder/:id", async (req, res) => {
//     try {
//         const orderId = await AccountService.getOrderFromAccount(req.session.account._id, req.params.id);
//         const order = await OrderService.readOrder(orderId);
//         res.status(200).json(OrderService.createOrderViewModel(order));
//
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
//
//
// // ========================== Работа со списком желаемого ============================
// // получить список
// router.get("/wishlist/getWishlist", async (req, res) => {
//     try {
//         const wishlist = await AccountService.getAccWishlist(req.session.account._id);
//         res.status(200).json(wishlist);
//
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // добавить товар в список
// router.post("/wishlist/addToWishlist/:id", async (req, res) => {
//     try {
//         const result = await AccountService.addToWishlist(req.session.account._id, req.params.id);
//         res.status(200).json(result);
//
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // убрать товар из списка
// router.post("/wishlist/removeFromWishlist", async (req, res) => {
//     try {
//         const result = await AccountService.removeFromWishlist(req.session.account._id, req.params.id);
//         res.status(200).json(result);
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// // очистить список
// router.post("/wishlist/clearWishlist", async (req, res) => {
//     try {
//         const result = await AccountService.clearWishlist(req.session.account._id);
//         res.status(200).json(result);
//     } catch (e) {
//         res.status(500).json({
//             message: "server error:" + e.message
//         });
//     }
// });
//
// module.exports = router;