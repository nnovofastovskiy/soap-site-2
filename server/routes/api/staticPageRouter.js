// роуты связанные с контентом на страницах:
//  about, delivery, contacts, partnership, qasection, sertificates
// чтение - без требований, изменение - только админ
const {Router} = require("express");
const controller = require('../../controllers/api/staticPageController');

const router = Router();

// чтение
router.get("/getContent/:name", controller.readStaticPageContent);

// изменение
router.post("/setContent", controller.changeStaticPageContent);


module.exports = router;
