const CollectionService = require("./collection.service");
const logger = require("../../common/logger/logger.service");

// REST
// POST - CREATE
module.exports.createCollection = async function (req, res) {
    try {
        const {name, description, image} = req.body;

        // проверяем на коллекцию
        const isCollectionExists = await CollectionService.checkForCollectionInDb(name);
        if (isCollectionExists) {
            logger.info(`api/collection/[POST] - collection ${name} already exists;`);
            return res.status(200).json({
                message: "collection already exists"
            });
        }
        // объект на основании данных формы
        const candidate = {
            name: name,
            description: description,
            image: image,
        }

        const result = await CollectionService.createCollection(candidate);
        await CollectionService.refreshProductsInCollectionByName(name);

        logger.info(`api/collection/[POST] - collection ${name} created;`);
        return res.status(201).json(CollectionService.createViewModelFromCollection(result));

    } catch (error) {
        logger.error("api/collection/[POST] - can't create collection!;");
        return res.status(500).json({
            message: "server error:" + error.message
        });
    }
}

// GET - READ
module.exports.readCollectionById = async function (req, res) {
    try {
        const collection = await CollectionService.readCollectionById(req.params.id);
        const collectionViewModel = CollectionService.createViewModelFromCollection(collection);
        return res.status(200).json(collectionViewModel);

    } catch (e) {
        logger.error( `api/collection/:id[GET] - can't read ${req.params.id} collection!;`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

// GET ALL
module.exports.readAllCollections = async function (req, res) {
    try {
        const collections = await CollectionService.readAllCollections();
        const collectionsViewModels = [];
        for (let collection of collections){
            collectionsViewModels.push(CollectionService.createViewModelFromCollection(collection));
        }
        return res.status(200).json(collectionsViewModels);

    } catch (e) {
        logger.error("[api/collection/].GET - can't read all collection!;");
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

// PUT - UPDATE (через POST)
module.exports.updateCollection = async function (req, res) {
    try {
        const {_id, name, description, image} = req.body;

        // объект на основании данных формы
        const candidate = {
            _id: _id,
            name: name,
            description: description,
            image: image
        };

        const result = await CollectionService.updateCollection(candidate);
        logger.info(`api/collection/edit/[POST] - collection ${_id} edited;`);
        return res.status(200).json(CollectionService.createViewModelFromCollection(result));

    } catch (e) {
        logger.error(`api/collection/edit/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

// DELETE - DELETE (через POST)
module.exports.deleteCollectionById = async function (req, res) {
    try {
        const result = await CollectionService.deleteCollectionById(req.body._id);
        if (result) {
            logger.info( `api/collection/delete/[POST] - collection ${req.body._id} deleted;`);
            return res.status(200).json({deletedId: req.body._id});
        }
        return res.status(500).json({message:`cant delete collection ${req.body._id}`});

    } catch (e) {
        logger.error( `api/collection/delete[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}


// Extended
// считать по имени
module.exports.readCollectionByName = async function (req, res) {
    try {
        const collection = await CollectionService.readCollectionByName(req.params.name);
        const collectionViewModel = CollectionService.createViewModelFromCollection(collection);
        return res.status(200).json(collectionViewModel);

    } catch (e) {
        logger.error(`api/collection/name/:name[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

// получить массив имён всех коллекций
module.exports.readCollectionsNames = async function (req, res) {
    try {
        const collectionNames = await CollectionService.readAllCollectionNames();
        return res.status(200).json({
            names: collectionNames
        });

    } catch (e) {
        logger.error(`api/collection/all/names[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}


// imgRef: id
module.exports.getCollectionImageRefById = async function (req, res) {
    try {
        const imageRef = await CollectionService.getCollectionImageRef(req.params.id);
        return res.status(200).json({
            ref: imageRef
        });

    } catch (e) {
        logger.error(`api/collection/imgRef/:id[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}


// imgRef: name
module.exports.getCollectionImageRefByName = async function (req, res) {
    try {
        const imageRef = await CollectionService.getCollectionImageRefByName(req.params.name);
        return res.status(200).json({
            ref: imageRef
        });

    } catch (e) {
        logger.error( `api/collection/imgRef/:id[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

// add sale
module.exports.addSaleToCollection = async function (req, res) {
    try {
        let {collectionId, saleId} = req.body;
        const result = await CollectionService.addSaleToCollection(collectionId, saleId);
        if (!result.message) {
            logger.info(`api/collection/addSale/[POST] - sale ${saleId} added to collection ${collectionId};`);
            return res.status(200).json(result);
        } else {
            logger.info(`api/collection/addSale/[POST] - sale ${saleId}, collection ${collectionId} - ${result.message};`);
            return res.status(200).json(result);
        }

    } catch (e) {
        logger.error("error", `api/collection/addSale/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

// remove sale
module.exports.removeSaleFromCollection = async function (req, res) {
    try {
        let {collectionId, saleId} = req.body;
        const result = await CollectionService.removeSaleFromCollection(collectionId, saleId);
        if (!result.message) {
            logger.info(`api/collection/removeSale/[POST] - sale ${saleId} removed from collection ${collectionId};`);
            return res.status(200).json(result);
        } else {
            logger.info("info", `api/collection/removeSale/[POST] - sale ${saleId}, collection ${collectionId} - ${result.message};`);
            return res.status(200).json(result);
        }

    } catch (e) {
        logger.error(`api/product/removeSale/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}