// роутер управления картинками
// Он же роутер, он же и сервис, так как не удобно перебрасывать объекты в функции
const express = require("express");
const multer = require("multer");
const settings = require("../../settings");
const path = require("path");

const controller = require('../../controllers/api/imagesController');

const router = express.Router();


function convertLetter(letter) {
    if ((letter >= '0' && letter <= '9') ||
        (letter >= 'a' && letter <= 'z') ||
        (letter == '.')
    ) {
        return letter;
    } else {
        switch (letter) {
            case 'а': return "a";
            case 'б': return "b";
            case 'в': return "v";
            case 'г': return "g";
            case 'д': return "d";
            case 'е': return "e";
            case 'ё': return "e";
            case 'ж': return "zh";
            case 'з': return "z";
            case 'и': return "i";
            case 'й': return "iy";
            case 'к': return "k";
            case 'л': return "l";
            case 'м': return "m";
            case 'н': return "n";
            case 'о': return "o";
            case 'п': return "p";
            case 'р': return "r";
            case 'с': return "s";
            case 'т': return "t";
            case 'у': return "u";
            case 'ф': return "f";
            case 'х': return "h";
            case 'ц': return "c";
            case 'ч': return "ch";
            case 'ш': return "sh";
            case 'щ': return "sch";
            case 'ъ': return "";
            case 'ы': return "y";
            case 'ь': return "";
            case 'э': return "e";
            case 'ю': return "u";
            case 'я': return "ya";
            default: return "_";
        }
    }
}

function convertName(name) {
    let convertedName = "";
    let originalName = String(name).toLowerCase();
    for (let letter of originalName) {
        convertedName += convertLetter(letter);
    }
    return convertedName;
}

// куда и как сохранять файлы
const storageImgProduct = multer.diskStorage({
    // функции над файлами

    // куда складывать файлы
    destination(req, file, cb) {
        cb(null, path.join(settings.PROJECT_DIR, "/public/images/products"));
    },
    // как назвать файл
    filename(req, file, cb) {
        const convertedName = convertName(file.originalname);
        //console.log(convertedName);
        cb(null, convertedName);    // file.originalname +  convertedName + code
    }
});

const storageImgCollection = multer.diskStorage({
    // функции над файлами

    // куда складывать файлы
    destination(req, file, cb) {
        cb(null, path.join(settings.PROJECT_DIR, "/public/images/collections"));
    },
    // как назвать файл
    filename(req, file, cb) {
        const convertedName = convertName(file.originalname);
        //console.log(convertedName);
        cb(null, convertedName);    // file.originalName +  convertedName + code
    }
});

// валидация для файлов
// проверка на то, что это изображение
const allowedTypes = ["image/png", "image/jpeg", "image/jpeg"]  // "image/jfif"

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


const uploadImgProduct = multer({
    // конфигурация
    storage: storageImgProduct,
    fileFilter: fileFilter
});


const uploadImgCollection = multer({
    // конфигурация
    storage: storageImgCollection,
    fileFilter: fileFilter
});



// AddImage (file): json_result
// загрузка картинки на сервер
router.post("/product/addImage", uploadImgProduct.single('imageFile'), controller.addProductImage);

router.post("/collection/addImage", uploadImgCollection.single('imageFile'), controller.addCollectionImage);


// для картинок товаров и для картинок коллекций
// getImagesRoot: string
router.get("/getProductImagesRoot", controller.getProductImagesRoot);

router.get("/getCollectionImagesRoot", controller.getCollectionImagesRoot);

// GetImages: string[]
router.get("/", controller.getAllImages);

router.get("/product", controller.getProductsImages);

router.get("/collection", controller.getCollectionsImages);

// GetImage(fileName) : string
router.get("/name/:name", controller.getImageByFileName);

// DeleteProductImage(fileName): json_result
router.post("/delete", uploadImgCollection.none(), uploadImgProduct.none(), controller.deleteImage);

router.post("/delete/product", uploadImgProduct.none(), controller.deleteProductImage);

// DeleteCollectionImage(fileName): json_result
router.post("/delete/collection", uploadImgCollection.none(), controller.deleteCollectionImage);


// работа с альтами
router.post("/updateAlt", controller.updateAlt);

router.post("/removeAlt", controller.removeAlt);


module.exports = router;