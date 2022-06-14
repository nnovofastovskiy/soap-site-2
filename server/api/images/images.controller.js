const settings = require("../../settings");
const fs = require("fs");
const ImageService = require("./images.service");
const path = require("path");

const LoggerService = require("../../common/logger/loggerService");


module.exports.addProductImage = async function(req, res) {
    try {
        let imageFile;      // файл картинки из формы

        imageFile = req.file;
        if (imageFile) {
            const result = await ImageService.refreshImagesData();
            if (result && result.length) {
                LoggerService.serverLoggerWrite("info", "api/image/product/addImage/[POST] - img file uploaded");
                res.status(200).json({
                    message: "product img file uploaded"
                });
            } else {
                LoggerService.serverLoggerWrite("info", "api/image/product/addImage/[POST] - cant refresh");
                res.status(200).json({
                    message: "cant refresh"
                });
            }

        } else {
            LoggerService.serverLoggerWrite("info", "api/image/product/addImage/[POST] - no file uploaded");
            res.status(200).json({
                message: "no file uploaded"
            });
        }

    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/product/addImage/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.addCollectionImage = async function(req, res) {
    try {
        let imageFile;      // файл картинки из формы

        imageFile = req.file;
        if (imageFile) {
            const result = await ImageService.refreshImagesData();
            if (result && result.length) {
                LoggerService.serverLoggerWrite("info", "api/image/collection/addImage/[POST] - img file uploaded");
                res.status(200).json({
                    message: "collection img file uploaded"
                });
            } else {
                LoggerService.serverLoggerWrite("info", "api/image/collection/addImage/[POST] - cant refresh");
                res.status(200).json({
                    message: "cant refresh"
                });
            }

        } else {
            LoggerService.serverLoggerWrite("info", "api/image/collection/addImage/[POST] - no file uploaded");
            res.status(200).json({
                message: "no file uploaded"
            });
        }

    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/collection/addImage/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getProductImagesRoot = async function(req, res) {
    try {
        res.status(200).json({
            productImagesRoot: ImageService.productImagesRoot
        })
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/getProductImagesRoot/[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getCollectionImagesRoot = async function(req, res) {
    try {
        res.status(200).json({
            collectionImagesRoot: ImageService.collectionImagesRoot
        })
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/getCollectionImagesRoot/[GET] - ${e.message};`);
        res.status(500).json({
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
        res.status(200).json(imagesVM);
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/[GET] - ${e.message};`);
        res.status(500).json({
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
        res.status(200).json(imagesVM);
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/product/[GET] - ${e.message};`);
        res.status(500).json({
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
        res.status(200).json(imagesVM);
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/collection/[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.getImageByFileName = async function(req, res) {
    try {
        const image = await ImageService.getImageByName(req.params.name);
        res.status(200).json(ImageService.createImageFileViewModel(image));
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/name/:name[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}


module.exports.deleteImage = async function(req, res) {
    try {
        // получить объект картинки
        const imageFile = await ImageService.getImageByName(req.body.fileName);
        if (imageFile) {
            // удаление в папке
            fs.unlinkSync(path.join(settings.PROJECT_DIR, "public", imageFile.i_path));

            // удаление в БД
            await ImageService.deleteImageFile(imageFile._id);

            // обновление данных после удаления картинки
            await ImageService.clearImageUrls();

            LoggerService.serverLoggerWrite("info", `api/image/delete/[POST] - image ${req.body.fileName} deleted;`);
            res.status(200).json({
                message: "deleted:" + imageFile.i_fileName,
            })

        } else {
            LoggerService.serverLoggerWrite("info", `api/image/delete/[POST] - no image to delete - ${req.body.fileName};`);
            res.status(200).json({
                message: "no image"
            });
        }
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/delete/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}


module.exports.deleteProductImage = async function(req, res) {
    try {
        const imageFile = await ImageService.getImageByNameAndType(req.body.fileName, "product");
        if (imageFile) {
            fs.unlinkSync(path.join(settings.PROJECT_DIR, "public", imageFile.i_path));

            await ImageService.deleteImageFile(imageFile._id);

            // обновление данных после удаления картинки
            await ImageService.clearImageUrls();

            LoggerService.serverLoggerWrite("info", `api/image/delete/product/[POST] - image ${req.body.fileName} deleted;`);
            res.status(200).json({
                message: "deleted:" + imageFile.i_fileName,
            })

        } else {
            LoggerService.serverLoggerWrite("info", `api/image/delete/product/[POST] - no image to delete - ${req.body.fileName};`);
            res.status(200).json({
                message: "no image"
            });
        }
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/delete/product/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.deleteCollectionImage = async function(req, res) {
    try {
        const imageFile = await ImageService.getImageByNameAndType(req.body.fileName, "collection");
        if (imageFile) {
            fs.unlinkSync(path.join(settings.PROJECT_DIR, "public", imageFile.i_path));

            await ImageService.deleteImageFile(imageFile._id);

            // обновление данных после удаления картинки
            await ImageService.clearImageUrls();


            LoggerService.serverLoggerWrite("info", `api/image/delete/collection/[POST] - image ${req.body.fileName} deleted;`);
            res.status(200).json({
                message: "deleted:" + imageFile.i_fileName,
            })

        } else {
            LoggerService.serverLoggerWrite("info", `api/image/delete/collection/[POST] - no image to delete - ${req.body.fileName};`);
            res.status(200).json({
                message: "no image"
            });
        }
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/delete/collection/[POST] - ${e.message};`);
        res.status(500).json({
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

        res.status(200).json(ImageService.createImageAltViewModel(result));

    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/updateAlt[POST] - ${e.message};`);
        res.status(500).json({
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

        res.status(200).json({ status: "alt removed" });


    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/image/removeAlt[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}




