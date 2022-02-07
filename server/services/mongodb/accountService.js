// сервис аккаунтов

// работа с аккаунтами и с корзиной аккаунта
const Account = require("../../models/account");
const Product = require("../../models/product");
const Order = require("../../models/order");
let ObjectId = require('mongoose').Types.ObjectId;


// это больше к Админу - здесь базовые функции по созданию сущностей
// аккаунта, реальные - типа регистрации (с учётом заказов) - ниже,
// там же работа с корзиной, заказами и списком желаемого

// CRUD
// Create
module.exports.createAccount = async function (candidate) {
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
module.exports.readAccount = async function (id) {
    try {
        if (ObjectId.isValid(id)) {
            return await Account.findById(id);
        } else {
            return null;
        }
    } catch (e) {
        throw e;
    }
}

// Update
module.exports.updateAccount = async function (candidate) {
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
module.exports.deleteAccountById = async function (id) {
    try {
        if (ObjectId.isValid(id)) {
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
module.exports.readAccountByEmail = async function (email) {
    try {
        return await Account.findOne({ email: email });

    } catch (e) {
        throw e;
    }
}

// Read all
module.exports.readAllAccounts = async function () {
    try {
        return await Account.find({});

    } catch (e) {
        throw e;
    }
}

// создание ViewModel
module.exports.createViewModelFromAccount = function (account) {
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
            };

            for (let cartItem of account.cartItems) {
                accountVM.cartItems.push({
                    productId: cartItem.productId,
                    count: cartItem.count
                });
            }

            for (let order of account.orders) {
                accountVM.orders.push({
                    orderId: order.orderId
                });
            }

            for (let wishItem of account.wishlist) {
                accountVM.wishlist.push({
                    productId: wishItem.productId
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

module.exports.createLightViewModelFromAccount = function (account) {
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

async function createCartVM(account) {
    try {
        // ViewModel
        let isEmpty = true;
        // проверка на пустой объект
        for (let i in account)
            isEmpty = false;   // не пустой

        const cartVM = { cartItems: [] };
        if (account && !isEmpty) {
            for (let item of account.cartItems) {
                let product = await Product.findById(item.productId);

                cartVM.cartItems.push({
                    productId: product._id,
                    count: item.count
                });
            }
        }
        return cartVM;
    } catch (e) {
        throw e;
    }
}


// Create
module.exports.syncCartFromLSData = async function (accId, ls_data) {
    try {
        if (ObjectId.isValid(accId)) {
            let account = await Account.findById(accId);
            if (account) {
                account.cartItems = [];
                for (let item of ls_data.cartItems) {
                    //account.cartItems.push(item);     // было
                    if (item.count > 0)                 // стало
                        account.cartItems.push(item);
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
module.exports.readCartByAccId = async function (accId) {
    try {
        if (ObjectId.isValid(accId)) {
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


module.exports.readCartVMByAccId = async function (accId) {
    try {
        if (ObjectId.isValid(accId)) {
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

module.exports.addToCart = async function (accId, productId) {
    try {
        if (ObjectId.isValid(accId) && ObjectId.isValid(productId)) {
            let account = await Account.findById(accId);
            const product = await Product.findById(productId);

            if (account) {
                if (product) {
                    let idx = account.cartItems.map(p => p.productId).indexOf(productId);
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
                    account.cartItems = account.cartItems.filter(p => p.productId !== productId);
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


module.exports.removeFromCart = async function (accId, productId) {
    try {
        if (ObjectId.isValid(accId) && ObjectId.isValid(productId)) {
            let account = await Account.findById(accId);
            const product = await Product.findById(productId);
            if (account) {
                if (product) {
                    let idx = account.cartItems.map(p => p.productId).indexOf(productId);
                    if (idx >= 0) {
                        if (account.cartItems[idx] === 1) {
                            account.cartItems = account.cartItems.filter(p => p.productId !== productId);
                        } else {
                            account.cartItems[idx].count--;
                        }
                        await account.save();
                    }
                    return await createCartVM(account);

                } else {
                    // товара уже не существует
                    account.cartItems = account.cartItems.filter(p => p.productId !== productId);
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

module.exports.clearCart = async function (accId) {
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

module.exports.createOrderTemplateFromAccCart = async function (accId) {
    try {
        if (ObjectId.isValid(accId)) {
            const account = await Account.findById(accId);
            if (account) {
                // объект заказа
                let order = {
                    items: [],
                    email: account.email,
                    name: account.name,
                    date: Date.now().toLocaleString()
                };

                // товары
                for (const item of account.cartItems) {
                    const pdb = Product.findById(item.productId);

                    order.items.push({
                        product: {
                            name: pdb.name,
                            price: pdb.price
                        },
                        count: item.count
                    });
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
module.exports.getOrdersFromAccount = async function (id) {
    try {
        if (ObjectId.isValid(id)) {
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
module.exports.getOrderFromAccount = async function (accId, orderId) {
    try {
        if (ObjectId.isValid(accId) && ObjectId.isValid(orderId)) {
            const account = await Account.findById(accId);
            if (account) {
                let idx = account.orders.map(o => o.orderId).indexOf(orderId);
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
module.exports.getAccWishlist = async function (accId) {
    try {
        if (ObjectId.isValid(accId)) {
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
module.exports.addToWishlist = async function (accId, itemId) {
    try {
        if (ObjectId.isValid(accId) && ObjectId.isValid(itemId)) {
            let account = await Account.findById(accId);
            const product = await Product.findById(itemId);

            if (account) {
                if (product) {
                    let idx = account.wishlist.indexOf(itemId);
                    if (idx < 0) {
                        account.wishlist.push(itemId);
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
module.exports.removeFromWishlist = async function (accId, itemId) {
    try {
        if (ObjectId.isValid(accId) && ObjectId.isValid(itemId)) {
            let account = await Account.findById(accId);
            const product = await Product.findById(itemId);

            if (account) {
                if (product) {
                    let idx = account.wishlist.indexOf(itemId);
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
module.exports.clearWishlist = async function (accId) {
    try {
        if (ObjectId.isValid(accId)) {
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
module.exports.checkForEmailInDb = async function (email) {
    try {
        const candidate = await Account.findOne({ email: email });
        if (candidate) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        throw e;
    }
}


