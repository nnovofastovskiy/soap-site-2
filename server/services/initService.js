// сервис для инциализации сервера - все предстартовые операции
const MetaService = require("./mongodb/metaService");
const StockService = require("./mongodb/stockService");
const StaticPageService = require("./mongodb/staticPageService");
const ImagesService = require("./mongodb/imagesService");
const BackupService = require("./backupService");
const LoggerService = require("./loggerService");
const CollectionService = require("./mongodb/collectionService");


module.exports.init = async function () {

    // инициализация объекта Meta
    await metaInit();

    // инициализация склада
    await stockInit();

    // инициализация страниц
    await staticPagesInit();

    // обновление картинок в БД
    await imagesInit();

    // инициализация логгера сервера (не кастомного)
    serverLoggerInit();

    // инициализация объекта бэкапа
    backupInit();

    // обновление товаров в коллекциях
    await updateProductsInCollections();
}

async function metaInit() {
    try {
        const isMeta = await MetaService.isMetaExistsInDB();
        if (!isMeta) {
            await MetaService.metaInitInDB();
        }

        //await MetaService.metaAllTrue();  // установить true во всю мету
        //await MetaService.metaEmailToFalse();
        await MetaService.metaAllFalse();

        await MetaService.refreshMetaVars();
    } catch (e) {
        console.log(e);
    }
}

async function stockInit() {
    try {
        const isStock = await StockService.isStockExists();
        if (!isStock) {
            await StockService.initStock();
        }
    } catch (e) {
        console.log(e);
    }
}

// инициализация страниц со статическим контентом
async function staticPagesInit() {
    try {
        const isAbout = await StaticPageService.isStaticPageExists("about");
        if (!isAbout) {
            await StaticPageService.createStaticPageViaName("about");
        }

        const isContacts = await StaticPageService.isStaticPageExists("contacts");
        if (!isContacts) {
            await StaticPageService.createStaticPageViaName("contacts");
        }

        const isDelivery = await StaticPageService.isStaticPageExists("delivery");
        if (!isDelivery) {
            await StaticPageService.createStaticPageViaName("delivery");
        }

        const isPartnership = await StaticPageService.isStaticPageExists("partnership");
        if (!isPartnership) {
            await StaticPageService.createStaticPageViaName("partnership");
        }

        const isQasection = await StaticPageService.isStaticPageExists("qasection");
        if (!isQasection) {
            await StaticPageService.createStaticPageViaName("qasection");
        }

        const isSertificates = await StaticPageService.isStaticPageExists("sertificates");
        if (!isSertificates) {
            await StaticPageService.createStaticPageViaName("sertificates");
        }
    } catch (e) {
        console.log(e);
    }
}

async function imagesInit() {
    try {
        await ImagesService.refreshImagesData();
        await ImagesService.clearImageUrls();
    } catch (e) {
        console.log(e);
    }
}


function serverLoggerInit() {
    try {
        LoggerService.serverLoggerInit();
    } catch (e) {
        console.log(e);
    }
}


function backupInit() {
    try {
        BackupService.backupInit();
    } catch (e) {
        console.log(e);
    }
}


async function updateProductsInCollections() {
    try {
        // обновляем поля products в коллекциях, так как создан товар
        await CollectionService.refreshProductsInCollections();
    } catch (e) {
        console.log(e);
    }
}

