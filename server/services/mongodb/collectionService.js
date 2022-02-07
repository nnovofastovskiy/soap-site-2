const Collection = require("../../models/collection");
const Product = require("../../models/product");
const keys = require("../../keys/keys");
const Sale = require("../../models/sale");
const ImageAlt = require("../../models/imageAlt");
let ObjectId = require('mongoose').Types.ObjectId;

// Create +
module.exports.createCollection = async function (candidate) {
    try {
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

    } catch (e) {
        throw e;
    }
}

// Read +
module.exports.readCollectionById = async function (id) {
    try {
        if (ObjectId.isValid(id)) {
            return await Collection.findById(id);
        } else {
            return null;
        }

    } catch (e) {
        throw e;
    }
}

// Update (by entity (id)) +
module.exports.updateCollection = async function (candidate) {
    try {
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
        } else {
            return {};
        }
    } catch (e) {
        throw e;
    }
}

// Delete +
module.exports.deleteCollectionById = async function (id) {
    try {
        if (ObjectId.isValid(id)) {
            return Collection.deleteOne({ _id: id });
        } else {
            return null;
        }

    } catch (e) {
        throw e;
    }
}






//======= Additional ====================
// Read All collections names +
module.exports.readAllCollectionNames = async function () {
    try {
        const collections = await Collection.find({});
        return collections.map(c => c.name);

    } catch (e) {
        throw e;
    }
}

// Read All +
module.exports.readAllCollections = async function () {
    try {
        return await Collection.find({});
    } catch (e) {
        throw e;
    }
}

// Read By Name
module.exports.readCollectionByName = async function (name) {
    try {
        return await Collection.findOne({ name: name });

    } catch (e) {
        throw e;
    }
}

// Delete all
module.exports.dropCollections = async function () {
    try {
        return await Collection.deleteMany({});
    } catch (e) {
        throw e;
    }
}


// Create ViewModel
module.exports.createViewModelFromCollection = function (collection) {
    try {
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

        } else {
            return {};
        }
    } catch (e) {
        throw e;
    }
}

// Refresh products list in collection
module.exports.refreshProductsInCollectionById = async function (id) {
    try {
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

            } else {
                return {};
            }
        } else {
            return {};
        }
    } catch (e) {
        throw e;
    }
}

module.exports.refreshProductsInCollectionByName = async function (name) {
    try {
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

        } else {
            return {};
        }

    } catch (e) {
        throw e;
    }
}

module.exports.refreshProductsInCollections = async function () {
    try {
        // получаем все товары
        const products = await Product.find({});

        // получаем все коллекции
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

    } catch (e) {
        throw e;
    }
}

module.exports.getCollectionImageRef = async function (id) {
    try {
        if (ObjectId.isValid(id)) {
            const collection = await Collection.findById(id);
            return collection.image;
        } else {
            return "";
        }

    } catch (e) {
        throw e;
    }
}

module.exports.getCollectionImageRefByName = async function (name) {
    try {
        const collection = await Collection.findOne({ name: name });
        return collection.image;

    } catch (e) {
        throw e;
    }
}

// проверка на имя такой-же коллекции в БД
module.exports.checkForCollectionInDb = async function (name) {
    try {
        const collection = await Collection.findOne({ name: name });
        if (collection)
            return true;
        else
            return false;
    } catch (e) {
        throw e;
    }
}


// добавление скидки (акции) к коллекции
module.exports.addSaleToCollection = async function (collectionId, saleId) {
    try {
        if (ObjectId.isValid(collectionId) && ObjectId.isValid(saleId)) {
            // получить коллекцию
            let collection = await Collection.findById(collectionId);
            if (collection) {
                // получить скидку
                const sale = await Sale.findById(saleId);
                if (sale) {
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

                } else {
                    return { message: "no sale by id" };
                }
            } else {
                return { message: "no collection by id" };
            }
        } else {
            return { message: "wrong collectionId or saleId" };
        }
    } catch (e) {
        throw e;
    }
}

// удаление скидки из товара
module.exports.removeSaleFromCollection = async function (collectionId, saleId) {
    try {
        if (ObjectId.isValid(collectionId) && ObjectId.isValid(saleId)) {
            // получить товар
            let collection = await Collection.findById(collectionId);
            if (collection) {
                // получить скидку
                const sale = await Sale.findById(saleId);
                if (sale) {
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

                } else {
                    return { message: "no sale by id" };
                }
            } else {
                return { message: "no collection by id" };
            }
        } else {
            return { message: "wrong collectionId or saleId" };
        }
    } catch (e) {
        throw e;
    }
}


// получение всех коллекций по скдике (id)
// module.exports.getProductsBySaleId = async function(saleId) {
//     try {
//         return await Collection.find({sales: [saleId]});
//
//     } catch (e) {
//         throw e;
//     }
// }
//
// module.exports.getActivatedProductsBySaleId = async function (saleId) {
//     try {
//         return await Collection.find({$and: [{sales: [saleId]},{isActive:true}]});
//
//     } catch (e) {
//         throw e;
//     }
// }