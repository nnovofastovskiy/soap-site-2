const {Router} = require('express');
const controller = require('./authController');

const router = Router();

// post обычного пользователя
router.post("/login", controller.login);

// post администратора
router.post("/admin/login", controller.adminLogin);

router.get('/logout', controller.logout);


// регистрация пользователя
router.post("/register", controller.register);

router.get("/confirmAccountEmail/:token", controller.confirmAccountEmail)


// ================= Сброс пароля =================================
router.post("/reset", controller.resetPassword);

router.post("/confirmReset", controller.confirmResetPassword)


module.exports = router;