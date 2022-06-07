// роутинг управления мета-объектом
const {Router} = require("express");
const controller = require('./metaController');

const router = Router();

// получить мета-объект (управление функциями сайта)
router.get("/", controller.getMetaObject);

// флаг почты
router.post("/setEmails", controller.setEmailsFlag);

// флаг логгера
router.post("/setLog", controller.setLoggingFlag);

// флаг бэкапа
router.post("/setBackup", controller.setBackupFlag);

module.exports = router;