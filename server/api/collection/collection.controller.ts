import * as CollectionService from "./collection.service";
import logger from "../../common/logger/loggerService";

// REST
// POST - CREATE
export const createCollection = async function (req: any, res: any) {
  try {
    const {name, description, image} = req.body;

    // проверяем на коллекцию
    const isCollectionExists = await CollectionService.checkForCollectionInDb(name);
    if (!isCollectionExists) {
      // объект на основании данных формы
      const candidate = {
        name: name,
        description: description,
        image: image,
      }

      // создание коллекции в БД
      const result = await CollectionService.createCollection(candidate);

      // обновляем товары в коллекции
      await CollectionService.refreshProductsInCollectionByName(name);

      logger.info(`api/collection/[POST] - collection ${name} created;`);
      res.status(201).json(CollectionService.createViewModelFromCollection(result));

    } else {
      logger.info(`api/collection/[POST] - collection ${name} already exists;`);
      res.status(200).json({
        message: "collection already exists"
      });
    }
  } catch (error: any) {
    logger.error("api/collection/[POST] - can't create collection!;");
    res.status(500).json({
      message: "server error:" + error.message
    });
  }
}

// GET - READ
export const readCollectionById = async function (req: any, res: any) {
  try {
    // получение коллекции по id
    const collection = await CollectionService.readCollectionById(req.params.id);

    // создание ViewModel
    if (collection) {
      const collectionViewModel = CollectionService.createViewModelFromCollection(collection);
      // формирование ответа
      res.status(200).json(collectionViewModel);
    }

  } catch (e: any) {
    logger.error( `api/collection/:id[GET] - can't read ${req.params.id} collection!;`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}

// GET ALL
export const readAllCollections = async function (req: any, res: any) {
  try {
    const collections = await CollectionService.readAllCollections();

    const collectionsViewModel = [];
    for (let collection of collections){
      collectionsViewModel.push(CollectionService.createViewModelFromCollection(collection));
    }

    res.status(200).json(collectionsViewModel);

  } catch (e: any) {
    logger.error("[api/collection/].GET - can't read all collection!;");
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}

// PUT - UPDATE (через POST)
export const updateCollection = async function (req: any, res: any) {
  try {
    const {_id, name, description, image} = req.body;

    // объект на основании данных формы
    const candidate = {
      _id: _id,
      name: name,
      description: description,
      image: image
    };

    // обновление в БД (товары тоже)
    const result = await CollectionService.updateCollection(candidate);
    if (result) {
      logger.info(`api/collection/edit/[POST] - collection ${_id} edited;`);
      res.status(200).json(CollectionService.createViewModelFromCollection(result));
    } else {
      res.status(404).json({message: "not updated"});
    }

  } catch (e: any) {
    logger.error(`api/collection/edit/[POST] - ${e.message};`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}

// DELETE - DELETE (через POST)
export const deleteCollectionById = async function (req: any, res: any) {
  try {
    const collection = await CollectionService.readCollectionById(req.body._id);
    if (collection) {
      await DeleteService.addEntityToDeleted("collection", collection);
      const result = await CollectionService.deleteCollectionById(req.body._id);
      if (result) {
        logger.info( `api/collection/delete/[POST] - collection ${req.body._id} deleted;`);
        res.status(200).json({deletedId: req.body._id});

      } else {
        res.status(200).json({message:`cant delete collection ${req.body._id}`});
      }
    } else {
      logger.info(`api/collection/delete/[POST] - collection ${req.body._id} NOT deleted;`);
      res.status(200).json({
        message: "no collection to delete"
      });
    }
  } catch (e: any) {
    logger.error( `api/collection/delete[POST] - ${e.message};`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}


// Extended
// считать по имени
export const readCollectionByName = async function (req: any, res: any) {
  try {
    const collection = await CollectionService.readCollectionByName(req.params.name);
    if (collection) {
      const collectionViewModel = CollectionService.createViewModelFromCollection(collection);
      res.status(200).json(collectionViewModel);
    } else {
      res.status(403).json({message: "not found"});
    }
  } catch (e: any) {
    logger.error(`api/collection/name/:name[GET] - ${e.message};`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}

// получить массив имён всех коллекций
export const readCollectionsNames = async function (req: any, res: any) {
  try {
    const collectionNames = await CollectionService.readAllCollectionNames();
    res.status(200).json({
      names: collectionNames
    });

  } catch (e: any) {
    logger.error(`api/collection/all/names[GET] - ${e.message};`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}


// imgRef: id
export const getCollectionImageRefById = async function (req: any, res: any) {
  try {
    const imageRef = await CollectionService.getCollectionImageRef(req.params.id);
    res.status(200).json({
      ref: imageRef
    });

  } catch (e: any) {
    logger.error( `api/collection/imgRef/:id[GET] - ${e.message};`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}


// imgRef: name
export const getCollectionImageRefByName = async function (req: any, res: any) {
  try {
    const imageRef = await CollectionService.getCollectionImageRefByName(req.params.name);
    res.status(200).json({
      ref: imageRef
    });

  } catch (e: any) {
    logger.error( `api/collection/imgRef/:id[GET] - ${e.message};`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}

// add sale
export const addSaleToCollection = async function (req: any, res: any) {
  try {
    let {collectionId, saleId} = req.body;
    const result = await CollectionService.addSaleToCollection(collectionId, saleId);
    if (!result.message) {
      logger.info(`api/collection/addSale/[POST] - sale ${saleId} added to collection ${collectionId};`);
      res.status(200).json(result);
    } else {
      logger.info(`api/collection/addSale/[POST] - sale ${saleId}, collection ${collectionId} - ${result.message};`);
      res.status(200).json(result);
    }

  } catch (e: any) {
    logger.error(`api/collection/addSale/[POST] - ${e.message};`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}

// remove sale
export const removeSaleFromCollection = async function (req: any, res: any) {
  try {
    let {collectionId, saleId} = req.body;
    const result = await CollectionService.removeSaleFromCollection(collectionId, saleId);
    if (!result.message) {
      logger.info(`api/collection/removeSale/[POST] - sale ${saleId} removed from collection ${collectionId};`);
      res.status(200).json(result);
    } else {
      logger.info(`api/collection/removeSale/[POST] - sale ${saleId}, collection ${collectionId} - ${result.message};`);
      res.status(200).json(result);
    }

  } catch (e: any) {
    logger.error(`api/product/removeSale/[POST] - ${e.message};`);
    res.status(500).json({
      message: "server error:" + e.message
    });
  }
}