const {Router} = require("express");
const controller = require('../../controllers/api/contactsController');
const express = require("express");
let jsonParser = express.json();

const router = Router();

// чтение
router.get("/read", controller.readContacts);

// изменение
router.post("/change", jsonParser, controller.changeContacts);


module.exports = router;