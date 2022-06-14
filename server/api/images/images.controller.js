const fs = require("fs");
const path = require("path");
const settings = require("../../settings");
const ImageService = require("./images.service");

const logger = require("../../common/logger/logger.service");


module.exports.addProductImage = async function(req, res) {
    try {
        let imageFile;      // файл картинки из формы

        imageFile = req.file;
        if (imageFile) {
            return res.status(200).json({
                message: "no file uploaded"
            });
        }

        const result = await ImageService.refreshImagesData();
        if (result && result.length) {
            logger.info("api/image/product/addImage/[POST] - img file uploaded");
            return res.status(200).json({
                message: "product img file uploaded"
            });
        } else {
            logger.info("api/image/product/addImage/[POST] - cant refresh");
            return res.status(200).json({
                message: "cant refresh"
            });
        }
    } catch (e) {
        logger.error(`api/image/product/addImage/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.addCollectionImage = async function(req, res) {
    try {
        let imageFile;      // файл картинки из формы

        imageFile = req.file;
        if (imageFile) {
            return res.status(200).json({
                message: "no file uploaded"
            });
        }

        const result = await ImageService.refreshImagesData();
        if (result && result.length) {
            logger.info("api/image/collection/addImage/[POST] - img file uploaded");
            return res.status(200).json({
                message: "collection img file uploaded"
            });
        } else {
            logger.info("api/image/collection/addImage/[POST] - cant refresh");
            return res.status(200).json({
                message: "cant refresh"
            });
        }

    } catch (e) {
        logger.error(`api/image/collection/addImage/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getProductImagesRoot = async function(req, res) {
    try {
        return res.status(200).json({
            productImagesRoot: ImageService.productImagesRoot
        })
    } catch (e) {
        logger.error(`api/image/getProductImagesRoot/[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getCollectionImagesRoot = async function(req, res) {
    try {
        return res.status(200).json({
            collectionImagesRoot: ImageService.collectionImagesRoot
        })
    } catch (e) {
        logger.error(`api/image/getCollectionImagesRoot/[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getAllImages = async function(req, res) {
    try {
        const images = await ImageService.getAllImages();
        let imagesVM = [];
        if (images && images.length) {
            for (let image of images) {
                imagesVM.push(ImageService.createImageFileViewModel(image));
            }
        }
        return res.status(200).json(imagesVM);
    } catch (e) {
        logger.error(`api/image/[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getProductsImages = async function(req, res) {
    try {
        const images = await ImageService.getAllImagesByType("product");
        let imagesVM = [];
        if (images && images.length) {
            for (let image of images) {
                imagesVM.push(ImageService.createImageFileViewModel(image));
            }
        }
        return res.status(200).json(imagesVM);
    } catch (e) {
        logger.error(`api/image/product/[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getCollectionsImages = async function(req, res) {
    try {
        const images = await ImageService.getAllImagesByType("collection");
        let imagesVM = [];
        if (images && images.length) {
            for (let image of images) {
                imagesVM.push(ImageService.createImageFileViewModel(image));
            }
        }
        return res.status(200).json(imagesVM);
    } catch (e) {
        logger.error(`api/image/collection/[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getImageByFileName = async function(req, res) {
    try {
        const image = await ImageService.getImageByName(req.params.name);
        return res.status(200).json(ImageService.createImageFileViewModel(image));
    } catch (e) {
        logger.error(`api/image/name/:name[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}


module.exports.deleteImage = async function(req, res) {
    try {
        // получить объект картинки
        const imageFile = await ImageService.getImageByName(req.body.fileName);
        if (!imageFile) {
            return res.status(200).json({
                message: "no image"
            });
        }
        // удаление в папке
        fs.unlinkSync(path.join(settings.PROJECT_DIR, "public", imageFile.i_path));
        // удаление в БД
        await ImageService.deleteImageFile(imageFile._id);
        // обновление данных после удаления картинки
        await ImageService.clearImageUrls();
        logger.info(`api/image/delete/[POST] - image ${req.body.fileName} deleted;`);
        return res.status(200).json({
            message: "deleted:" + imageFile.i_fileName,
        })

    } catch (e) {
        logger.error(`api/image/delete/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}


module.exports.deleteProductImage = async function(req, res) {
    try {
        const imageFile = await ImageService.getImageByNameAndType(req.body.fileName, "product");
        if (!imageFile) {
            return res.status(200).json({
                message: "no image"
            });
        }

        fs.unlinkSync(path.join(settings.PROJECT_DIR, "public", imageFile.i_path));
        await ImageService.deleteImageFile(imageFile._id);
        // обновление данных после удаления картинки
        await ImageService.clearImageUrls();
        logger.info(`api/image/delete/product/[POST] - image ${req.body.fileName} deleted;`);
        return res.status(200).json({
            message: "deleted:" + imageFile.i_fileName,
        });

    } catch (e) {
        logger.error(`api/image/delete/product/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.deleteCollectionImage = async function(req, res) {
    try {
        const imageFile = await ImageService.getImageByNameAndType(req.body.fileName, "collection");
        if (!imageFile) {
            return res.status(200).json({
                message: "no image"
            });
        }

        fs.unlinkSync(path.join(settings.PROJECT_DIR, "public", imageFile.i_path));
        await ImageService.deleteImageFile(imageFile._id);
        // обновление данных после удаления картинки
        await ImageService.clearImageUrls();

        logger.info(`api/image/delete/collection/[POST] - image ${req.body.fileName} deleted;`);
        return res.status(200).json({
            message: "deleted:" + imageFile.i_fileName,
        })
    } catch (e) {
        logger.error(`api/image/delete/collection/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}


module.exports.updateAlt = async function(req, res) {
    try {
        const { i_path, i_alt } = req.body;
        const candidate = {
            i_path: i_path,
            i_alt: i_alt
        };

        const result = await ImageService.updateImageAlt(candidate);
        // await ImageService.refreshImagesAlts();
        // await ImageService.refreshAltsInCollections();
        // await ImageService.refreshAltsInProducts();
        await ImageService.refreshAltsInImagesCollectionsProducts();

        return res.status(200).json(ImageService.createImageAltViewModel(result));

    } catch (e) {
        logger.error(`api/image/updateAlt[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.removeAlt = async function(req, res) {
    try {
        const { i_path } = req.body;

        await ImageService.removeImageAlt(i_path);
        // await ImageService.refreshImagesAlts();
        // await ImageService.refreshAltsInCollections();
        // await ImageService.refreshAltsInProducts();
        await ImageService.refreshAltsInImagesCollectionsProducts();

        return res.status(200).json({ status: "alt removed" });


    } catch (e) {
        logger.error(`api/image/removeAlt[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}




