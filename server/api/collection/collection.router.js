// Роуты коллекций
const {Router} = require("express");
const controller = require('./collection.controller')
const router = Router();


// POST - CREATE
router.post("/", controller.createCollection);

// GET - READ
router.get("/:id", controller.readCollectionById);

// GET ALL
router.get("/", controller.readAllCollections);

// PUT - UPDATE
router.post("/edit", controller.updateCollection);

// DELETE - DELETE
router.post("/delete", controller.deleteCollectionById);


// Extended
// считать по имени
router.get("/name/:name", controller.readCollectionByName);

// получить массив имён всех коллекций
router.get("/all/names", controller.readCollectionsNames);

// image references
router.get("/imgRef/:id", controller.getCollectionImageRefById);

router.get("/imgRef/name/:name", controller.getCollectionImageRefByName);


// add sale
router.post("/addSale", controller.addSaleToCollection);

// remove sale
router.post("/removeSale", controller.removeSaleFromCollection);


module.exports = router;