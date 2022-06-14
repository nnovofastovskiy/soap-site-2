const Collection = require("./collection.model");
const Product = require("../product/product.model");
const Sale = require("../sale/sale.model");
const ImageAlt = require("../images/imageAlt.model");
let ObjectId = require('mongoose').Types.ObjectId;

// Create +
module.exports.createCollection = async function (candidate) {
    // создание объекта коллекции
    const collection = new Collection({
        name: candidate.name,
        description: candidate.description,
        image: {}
    });

    if (candidate.sales && candidate.sales.length) {
        collection.sales = candidate.sales.slice();
    } else {
        collection.sales = [];
    }

    if (candidate.image) {
        collection.image.url = candidate.image;
    } else {
        collection.image.url = "/images/collections/default/img_collection.jpg";
    }

    const alt = await ImageAlt.findOne({ i_path: collection.image.url });
    if (alt) {
        collection.image.alt = alt.i_alt;
    } else {
        collection.image.alt = "Фотография продукта";
    }

    await collection.save();    // уже в монгу сохраняет
    return collection;    
}

// Read +
module.exports.readCollectionById = async function (id) {
    if (ObjectId.isValid(id)) {
        return await Collection.findById(id);
    } else {
        return null;
    }
}

// Update (by entity (id)) +
module.exports.updateCollection = async function (candidate) {
    const collection = await Collection.findById(candidate._id);
    if (collection) {
        collection.name = candidate.name;
        collection.description = candidate.description;

        if (candidate.image)
            collection.image.url = candidate.image;

        const alt = await ImageAlt.findOne({ i_path: collection.image.url });
        if (alt) {
            collection.image.alt = alt.i_alt;
        } else {
            collection.image.alt = "Фотография продукта";
        }


        if (candidate.sales && candidate.sales.length)
            collection.sales = candidate.sales.slice();


        // а вот тут надо обновить товары
        let products = await Product.find({ collectionId: collection._id });

        collection.products = [];
        for (let product of products) {
            collection.products.push({
                productId: product._id,
            });
        }

        await collection.save();
        return collection;

    }
    return {};   
}

// Delete +
module.exports.deleteCollectionById = async function (id) {
    if (ObjectId.isValid(id)) {
        const result = await Collection.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
    return false;
}



//======= Additional ====================
// Read All collections names +
module.exports.readAllCollectionNames = async function () {
    const collections = await Collection.find({});
    return collections.map(c => c.name);
}

// Read All +
module.exports.readAllCollections = async function () {
    return await Collection.find({});
}

// Read By Name
module.exports.readCollectionByName = async function (name) {
    return await Collection.findOne({ name: name });
}

// Delete all
module.exports.dropCollections = async function () {
    const result = await Collection.deleteMany({});
    return result.deletedCount > 0;
}


// Create ViewModel
module.exports.createViewModelFromCollection = function (collection) {
    let isEmpty = true;
    // проверка на пустой объект
    for (let i in collection)
        isEmpty = false;   // не пустой

    if (collection && !isEmpty) {
        let collectionVM = {
            _id: collection._id,
            name: collection.name,
            description: collection.description,
            image: {
                url: "",
                alt: "",
            },
            products: [],
            sales: []
        };

        if (collection.image && collection.image.url)
            collectionVM.image.url = collection.image.url;

        if (collection.image && collection.image.alt)
            collectionVM.image.alt = collection.image.alt;

        for (let product of collection.products) {
            collectionVM.products.push({
                productId: product.productId
            });
        }

        if (collection.sales && collection.sales.length) {
            for (let sale of collection.sales) {
                collectionVM.sales.push({
                    saleId: sale.saleId
                });
            }
        }
        return collectionVM;
    }
    return {};   
}

// Refresh products list in collection
module.exports.refreshProductsInCollectionById = async function (id) {
    if (ObjectId.isValid(id)) {
        const collection = await Collection.findById(id);
        if (collection) {
            // получаем товары, у которых collectionId равен _id коллекции
            let products = await Product.find({ collectionId: collection._id });
            collection.products = [];
            for (let product of products) {
                collection.products.push({
                    productId: product._id,
                });
            }
            await collection.save();
            return collection;
        }
    }
    return {};
}

module.exports.refreshProductsInCollectionByName = async function (name) {
    const collection = await Collection.findOne({ name: name });
    if (collection) {
        let products = await Product.find({ collectionId: collection._id });

        collection.products = [];
        for (let product of products) {
            collection.products.push({
                productId: product._id,
            });
        }

        await collection.save();
        return collection;
    }
    return {}; 
}

module.exports.refreshProductsInCollections = async function () {
    // все
    const products = await Product.find({});
    const collections = await Collection.find({});

    for (let collection of collections) {
        const currentProducts = products.filter(p => p.collectionId.toString() === collection._id.toString());

        collection.products = [];
        for (let product of currentProducts) {
            collection.products.push({
                productId: product._id,
            });
        };
        await collection.save();
    }
}

module.exports.getCollectionImageRef = async function (id) {
    if (ObjectId.isValid(id)) {
        const collection = await Collection.findById(id);
        return collection.image;
    } 
    return "";
}

module.exports.getCollectionImageRefByName = async function (name) {
    const collection = await Collection.findOne({ name: name });
    return collection.image;
}

// проверка на имя такой-же коллекции в БД
module.exports.checkForCollectionInDb = async function (name) {
    const collection = await Collection.findOne({ name: name });
    if (collection)
        return true;
    else
        return false;    
}


// добавление скидки (акции) к коллекции
module.exports.addSaleToCollection = async function (collectionId, saleId) {
    if (!ObjectId.isValid(collectionId) || !ObjectId.isValid(saleId)) {
        return { message: "wrong collectionId or saleId" };
    }
    let collection = await Collection.findById(collectionId);
    if (!collection) {
        return { message: "no collection by id" };
    }
    const sale = await Sale.findById(saleId);
    if (!sale) {
        return { message: "no sale by id" };
    }

    if (!collection.sales)
        collection.sales = [];

    const idx = collection.sales.map((sid) => {
        if (sid.saleId) {
            return sid.saleId.toString()
        }
    }).indexOf(saleId.toString());
    if (idx === -1) {
        collection.sales.push({ saleId: sale._id });
    }
    await collection.save();
    return {
        sales: collection.sales
    };    
}

// удаление скидки из товара
module.exports.removeSaleFromCollection = async function (collectionId, saleId) {
    if (!ObjectId.isValid(collectionId) || !ObjectId.isValid(saleId)) {
        return { message: "wrong collectionId or saleId" };
    }
    let collection = await Collection.findById(collectionId);
    if (!collection) {
        return { message: "no collection by id" };
    }
    const sale = await Sale.findById(saleId);
    if (!sale) {
        return { message: "no sale by id" };
    }

    if (!collection.sales)
        collection.sales = [];

    const idx = collection.sales.map((sid) => {
        if (sid.saleId) {
            return sid.saleId.toString()
        }
    }).indexOf(saleId.toString());

    if (idx !== -1) {
        collection.sales = collection.sales.filter(sid => sid.saleId.toString() !== saleId.toString());
    }
    await collection.save();
    return {
        sales: collection.sales
    };    
}