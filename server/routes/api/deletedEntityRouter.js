// Роуты коллекций
const {Router} = require("express");
const controller = require('../../controllers/api/deletedEntityController');

const router = Router();

router.get("/readAll/asEntities", controller.readAllAsEntities);

router.get("/readAll/asObjects", controller.readAllAsObjects);

router.post("/recoverByEid", controller.recoverByEntityId);

router.post("/recoverByOid", controller.recoverByObjectId);

router.get("/find/object/:id", controller.findByObjectId);

router.get("/find/entity/:id", controller.findByEntityId);

router.post("/delete", controller.destroy);

module.exports = router;