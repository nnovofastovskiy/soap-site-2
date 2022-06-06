// сервис аккаунтов, работа с аккаунтами и с корзиной аккаунта
import Account, {IAccount, ICartItem, IWishlistItem} from "../../models/account";
import Product from "../../models/product";
import Order, {IOrder, IOrderItem} from "../../models/order";
import {Schema, Types} from "mongoose";



// CRUD
// Create
export const createAccount = async function (candidate: IAccount) {
  try {
    const account = new Account({
      email: candidate.email,
      name: candidate.name,
      password: candidate.password,
      verified: candidate.verified,
    });

    await account.save();

    return account;

  } catch (e) {
    console.log(e);
  }
}

// Read
export const readAccount = async function (id: string) {
  try {
    if (Types.ObjectId.isValid(id)) {
      return await Account.findById(id);
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
}

// Update
export const updateAccount = async function (candidate: IAccount) {
  try {
    let account = await Account.findById(candidate._id);
    if (account) {
      account.name = candidate.name;
      account.email = candidate.email;
      account.password = candidate.password;
      account.verified = candidate.verified;

      await account.save();

      return account;
    } else {
      return {};
    }
  } catch (e) {
    throw e;
  }
}

// Delete
export const deleteAccountById = async function (id: string) {
  try {
    if (Types.ObjectId.isValid(id)) {
      return await Account.deleteOne({ _id: id });
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
}



// Additional

// Read by email
export const readAccountByEmail = async function (email: string) {
  try {
    return await Account.findOne({ email: email });

  } catch (e) {
    throw e;
  }
}

// Read all
export const readAllAccounts = async function () {
  try {
    return await Account.find({});

  } catch (e) {
    throw e;
  }
}

// создание ViewModel
export const createViewModelFromAccount = function (account: IAccount) {
  try {
    if (account) {
      let accountVM = {
        _id: account._id,
        email: account.email,
        name: account.name,
        verified: account.verified,
        cartItems: [],
        orders: [],
        wishlist: []
      } as {
        _id: Types.ObjectId,
        email: string,
        name: string,
        verified: boolean,
        cartItems: { productId: string, count: number}[],
        orders: {orderId: string}[],
        wishlist: {productId: string}[]
      };

      for (let cartItem of account.cartItems) {
        accountVM.cartItems.push({
          productId: cartItem.productId.toString(),
          count: cartItem.count
        });
      }

      for (let order of account.orders) {
        accountVM.orders.push({
          orderId: order.orderId.toString()
        });
      }

      for (let wishItem of account.wishlist) {
        accountVM.wishlist.push({
          productId: wishItem.productId.toString()
        });
      }

      return accountVM;
    } else {
      return {};
    }
  } catch (e) {
    throw e;
  }
}

export const createLightViewModelFromAccount = function (account: IAccount) {
  try {
    if (account) {
      return {
        _id: account._id,
        email: account.email,
        name: account.name,
        verified: account.verified,
      };
    } else {
      return {};
    }

  } catch (e) {
    throw e;
  }
}




// ============ Работа с корзиной ==========================
async function createCartVM(account: IAccount) {
  try {
    // ViewModel
    let isEmpty = true;
    // проверка на пустой объект
    for (let i in account)
      isEmpty = false;   // не пустой

    const cartVM: {
      cartItems: {
        productId: string,
        count: number
      }[]
    } = { cartItems: [] };
    if (account && !isEmpty) {
      for (let item of account.cartItems) {
        let product = await Product.findById(item.productId);
        if (product) {
          cartVM.cartItems.push({
            productId: product._id.toString(),
            count: item.count
          });
        }
      }
    }
    return cartVM;
  } catch (e) {
    throw e;
  }
}


// Create
export const syncCartFromLSData = async function (accId: string, ls_data: {
  cartItems: {
    productId: string,
    count: number
  }[]
}) {
  try {
    if (Types.ObjectId.isValid(accId)) {
      let account = await Account.findById(accId);
      if (account) {
        account.cartItems = [];
        for (let item of ls_data.cartItems) {
          if (item.count > 0) {
            account.cartItems.push({
              productId: Types.ObjectId.createFromHexString(item.productId),
              count: item.count
            } as ICartItem);
          }
        }
        await account.save();

        return createCartVM(account);
      } else {
        return { message: "no account" };
      }
    } else {
      return { message: "invalid accId" };
    }
  } catch (e) {
    throw e;
  }
}

// Read Cart
export const readCartByAccId = async function (accId: string) {
  try {
    if (Types.ObjectId.isValid(accId)) {
      const account = await Account.findById(accId);
      if (account) {
        return account.cartItems;
      } else {
        return { message: "no account" };
      }
    } else {
      return { message: "invalid accId"};
    }
  } catch (e) {
    throw e;
  }
}


export const readCartVMByAccId = async function (accId: string) {
  try {
    if (Types.ObjectId.isValid(accId)) {
      const account = await Account.findById(accId);

      if (account) {
        // ViewModel
        return await createCartVM(account);

      } else {
        return { message: "no account" };
      }
    } else {
      return { message: "invalid accId" };
    }
  } catch (e) {
    throw e;
  }
}



// Extended
export const addToCart = async function (accId: string, productId: string) {
  try {
    if (Types.ObjectId.isValid(accId) && Types.ObjectId.isValid(productId)) {
      let account = await Account.findById(accId);
      const product = await Product.findById(productId);

      if (account) {
        if (product) {
          let idx = account.cartItems.map(p => p.productId.toString()).indexOf(productId);
          if (idx >= 0) {
            account.cartItems[idx].count++;
          } else {
            account.cartItems.push({
              productId: product._id,
              count: 1
            });
          }
          await account.save();

          // ViewModel
          return await createCartVM(account);

        } else {
          // товара уже не существует
          account.cartItems = account.cartItems.filter(p => p.productId !== Types.ObjectId.createFromHexString(productId));
          await account.save();

          // ViewModel
          return await createCartVM(account);
        }
      } else {
        return { message: "no account" };   // { cartItems: [] };
      }
    } else {
      return { message: "invalid accId or productId" };   // { cartItems: [] };
    }
  } catch (e) {
    throw e;
  }
}


export const removeFromCart = async function (accId: string, productId: string) {
  try {
    if (Types.ObjectId.isValid(accId) && Types.ObjectId.isValid(productId)) {
      let account = await Account.findById(accId);
      const product = await Product.findById(productId);
      if (account) {
        if (product) {
          let idx = account.cartItems.map(p => p.productId.toString()).indexOf(productId);
          if (idx >= 0) {
            if (account.cartItems[idx].count === 1) {
              account.cartItems = account.cartItems.filter(p => p.productId.toString() !== productId);
            } else {
              account.cartItems[idx].count--;
            }
            await account.save();
          }
          return await createCartVM(account);

        } else {
          // товара уже не существует
          account.cartItems = account.cartItems.filter(p => p.productId.toString() !== productId);
          await account.save();
          return await createCartVM(account);
        }
      } else {
        return { message: "no account" }; // { cartItems: [] };
      }
    } else {
      return { message: "invalid accId or productId" }; // { cartItems: [] };
    }

  } catch (e) {
    throw e;
  }
}

export const clearCart = async function (accId: string) {
  try {
    if (ObjectId.isValid(accId)) {
      let account = await Account.findById(accId);
      if (account) {
        account.cartItems = [];
        await account.save();
        return await createCartVM(account);

      } else {
        return { message: "no account" }; // { cartItems: [] };
      }
    } else {
      return { message: "invalid accId" }; // { cartItems: [] };
    }
  } catch (e) {
    throw e;
  }
}

export const createOrderTemplateFromAccCart = async function (accId: string) {
  try {
    if (Types.ObjectId.isValid(accId)) {
      const account = await Account.findById(accId);
      if (account) {
        // объект заказа
        let order = {
          items: [],
          email: account.email,
          name: account.name,
          date: Date.now().toLocaleString()
        } as {
          items: IOrderItem[],
          email: string,
          name: string,
          date: string
        };

        // товары
        for (const item of account.cartItems) {
          const pdb = await Product.findById(item.productId);
          if (pdb) {
            order.items.push({
              product: {
                name: pdb.name,
                price: pdb.price
              },
              count: item.count
            } as IOrderItem);
          }
        }
        return order;
      }
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
}


// ======================= работа с заказами ========================
// получить список заказов у аккаунта
export const getOrdersFromAccount = async function (id: string) {
  try {
    if (Types.ObjectId.isValid(id)) {
      const account = await Account.findById(id);
      if (account) {
        return account.orders;
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
}

// получить конкретный заказ у аккаунта
export const getOrderFromAccount = async function (accId: string, orderId: string) {
  try {
    if (Types.ObjectId.isValid(accId) && Types.ObjectId.isValid(orderId)) {
      const account = await Account.findById(accId);
      if (account) {
        let idx = account.orders.map(o => o.orderId.toString()).indexOf(orderId);
        if (idx >= 0) {
          return account.orders[idx];
        }
      }
    } else {
      return {};
    }
  } catch (e) {
    throw e;
  }
}


// ======================= работа со списком желаемого =================
// получить список
export const getAccWishlist = async function (accId: string) {
  try {
    if (Types.ObjectId.isValid(accId)) {
      const account = await Account.findById(accId);
      if (account) {
        return {
          wishlist: account.wishlist.slice()
        };
      } else {
        return { wishlist: [] };
      }
    } else {
      return { wishlist: [] };
    }
  } catch (e) {
    throw e;
  }
}


// добавить в список
export const addToWishlist = async function (accId: string, itemId: string) {
  try {
    if (Types.ObjectId.isValid(accId) && Types.ObjectId.isValid(itemId)) {
      let account = await Account.findById(accId);
      const product = await Product.findById(itemId);

      if (account) {
        if (product) {
          let idx = account.wishlist.map(wi => wi.productId.toString()).indexOf(itemId);
          if (idx < 0) {
            account.wishlist.push({
              productId: Types.ObjectId.createFromHexString(itemId)
            } as IWishlistItem);
            account.save();
          }
          return {
            result: "added"
          };
        } else {
          return {
            result: "no product"
          };
        }
      } else {
        return {
          result: "no account"
        };
      }
    } else {
      return {
        result: "wrong Id's"
      };
    }
  } catch (e) {
    throw e;
  }
}

// убрать из списка
export const removeFromWishlist = async function (accId: string, itemId: string) {
  try {
    if (Types.ObjectId.isValid(accId) && Types.ObjectId.isValid(itemId)) {
      let account = await Account.findById(accId);
      const product = await Product.findById(itemId);

      if (account) {
        if (product) {
          let idx = account.wishlist.map(wi => wi.productId.toString()).indexOf(itemId);
          if (idx >= 0) {
            account.wishlist = account.wishlist.filter(i => i.productId.toString() === itemId.toString());
            account.save();
          }
          return {
            result: "removed"
          };
        } else {
          return {
            result: "no product"
          };
        }
      } else {
        return {
          result: "no account"
        };
      }
    } else {
      return {
        result: "wrong Id's"
      };
    }
  } catch (e) {
    throw e;
  }
}


// очистить список
export const clearWishlist = async function (accId: string) {
  try {
    if (Types.ObjectId.isValid(accId)) {
      let account = await Account.findById(accId);
      if (account) {
        account.wishlist = [];
        account.save();
        return {
          result: "cleared"
        }

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


// проверка на email
module.exports.checkForEmailInDb = async function (email: string) {
  try {
    const candidate = await Account.findOne({ email: email });
    return !!candidate;
  } catch (e) {
    throw e;
  }
}


