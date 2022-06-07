import Collection, {ICollection} from "./collection.model";
import Product from "../product/product.model";
import {keys} from "../../keys/keys";
import Sale from "../sale/sale.model";
import ImageAlt from "../images/imageAlt.model";
import {ObjectId, Types} from 'mongoose';

// Create +
export const createCollection = async function (candidate: any) {
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
      collection.image.url = candidate.image.url;
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
export const readCollectionById = async function (id: string) {
  try {
    if (Types.ObjectId.isValid(id)) {
      return await Collection.findById(id);
    } else {
      return null;
    }

  } catch (e) {
    throw e;
  }
}

// Update (by entity (id)) +
export const updateCollection = async function (candidate: any) {
  const collection = await Collection.findById(candidate._id);
  if (collection) {
    collection.name = candidate.name;
    collection.description = candidate.description;

    if (candidate.image)
      collection.image.url = candidate.image.url;

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
}

// Delete +
export const deleteCollectionById = async function (id: string) {
  try {
    if (Types.ObjectId.isValid(id)) {
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
export const readAllCollectionNames = async function () {
  try {
    const collections = await Collection.find({});
    return collections.map(c => c.name);

  } catch (e) {
    throw e;
  }
}

// Read All +
export const readAllCollections = async function () {
  try {
    return await Collection.find({});
  } catch (e) {
    throw e;
  }
}

// Read By Name
export const readCollectionByName = async function (name: string) {
  try {
    return await Collection.findOne({ name: name });

  } catch (e) {
    throw e;
  }
}

// Delete all
export const dropCollections = async function () {
  try {
    return await Collection.deleteMany({});
  } catch (e) {
    throw e;
  }
}


// Create ViewModel
export const createViewModelFromCollection = function (collection: ICollection) {
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
      } as {
        _id: string,
        name: string,
        description: string,
        image: {
          url: string,
          alt: string,
        },
        products: {productId: string}[],
        sales: {saleId: string}[]
      };

      if (collection.image && collection.image.url)
        collectionVM.image.url = collection.image.url;

      if (collection.image && collection.image.alt)
        collectionVM.image.alt = collection.image.alt;

      for (let product of collection.products) {
        collectionVM.products.push({
          productId: product.productId.toString()
        });
      }

      if (collection.sales && collection.sales.length) {
        for (let sale of collection.sales) {
          collectionVM.sales.push({
            saleId: sale.saleId.toString()
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
export const refreshProductsInCollectionById = async function (id: string) {
  try {
    if (Types.ObjectId.isValid(id)) {
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

export const refreshProductsInCollectionByName = async function (name: string) {
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

export const refreshProductsInCollections = async function () {
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
      }

      await collection.save();
    }

  } catch (e) {
    throw e;
  }
}

export const getCollectionImageRef = async function (id: string) {
  try {
    if (ObjectId.isValid(id)) {
      const collection = await Collection.findById(id);
      if (collection) {
        return collection.image;
      }
    }
    return "";
  } catch (e) {
    throw e;
  }
}

export const getCollectionImageRefByName = async function (name: string) {
  try {
    const collection = await Collection.findOne({ name: name });
    if (collection) {
      return collection.image;
    }
    return "";
  } catch (e) {
    throw e;
  }
}

// проверка на имя такой-же коллекции в БД
export const checkForCollectionInDb = async function (name: string) {
  try {
    const collection = await Collection.findOne({ name: name });
    return !!collection;
  } catch (e) {
    throw e;
  }
}


// добавление скидки (акции) к коллекции
export const addSaleToCollection = async function (collectionId: string, saleId: string) {
  try {
    if (Types.ObjectId.isValid(collectionId) && Types.ObjectId.isValid(saleId)) {
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
export const removeSaleFromCollection = async function (collectionId: string, saleId: string) {
  try {
    if (Types.ObjectId.isValid(collectionId) && Types.ObjectId.isValid(saleId)) {
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
