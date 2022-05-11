// описание роутов для фронта

const root_route = process.env.NEXT_PUBLIC_DOMAIN;

export const API = {
    collections: {
        create: root_route + "/api/collection",         // POST, admin, input: form[name, description?, image?], создать коллекцию, image - путь до картинки, без локалхоста
        read: root_route + "/api/collection",          // GET, получить все коллекции (в виде массива)
        readById: root_route + "/api/collection/{id}",    // GET, params.id - получить коллекцию по id
        readByName: root_route + "/api/collection/name/{name}",  // GET, params.name - получить коллекцию по её имени
        allNames: root_route + "/api/collection/all/names", // GET - получить имена всех коллекций
        update: root_route + "/api/collection/edit",    // POST, admin, input: form[_id, name, description?, image?], изменить мета-данные коллекции (товары обновляются автоматически, вручную не надо)
        delete: root_route + "/api/collection/delete",  // POST, admin, input: form[_id] - удаляет коллекцию
        imgRefById: root_route + "/api/collection/imgRef/{id}", // GET, params.id - получить ссылку на картинку по id
        imgRefByName: root_route + "/api/collection/imgRef/name/{name}", // GET,params.name - получить ссылку на картинку по имени
        addSale: root_route + "/api/collection/addSale",    // POST, admin, form[collectionId, saleId] - добавляет saleId в массив sales объекта collection
        removeSale: root_route + "/api/collection/removeSale", // POST, admin, form[collectionId, saleId] - удаляет saleId из массива sales объекта collection
    },
    products: {
        create: root_route + "/api/product/",   // POST, admin, form[name, collectionId, price, description, isActive, images] - создать, images - массив ссылок на картинки (именно пути, без локалхоста)
        getOneById: root_route + "/api/product/",   // GET, params.id - считать один товар по его id
        getOneByName: root_route + "/api/product/name/:name",   // GET, params.name - считать один товар по его имени
        getAll: root_route + "/api/product/",   // GET, - считать все товары (у которых isActive:true)
        getInCollectionById: root_route + "/api/product/inCollection/",   // GET, params.id - считать все товары в коллекции по её id (у которых isActive:true)
        getInCollectionByName: root_route + "/api/product/inCollection/name/:name",   // GET, params.name - считать все товары в коллекции по её имени (у которых isActive:true)
        update: root_route + "/api/product/edit",   // POST, admin, form[_id, name, collectionId, price, description, isActive, images**] - обновить
        delete: root_route + "/api/product/delete",   // POST, admin, form[_id]
        getFull: root_route + "/api/product/get/full",   // GET, admin - получить все товары, даже те у кого isActive: false
        activateOne: root_route + "/api/product/activate/:id",   // GET, admin, params.id - установить товару (по id) isActive: true
        deactivateOne: root_route + "/api/product/deactivate/:id",   // GET, admin, params.id - установить товару (по id) isActive: false
        getByArrIds: root_route + "/api/product/get/byArrIds",  // GET, [json] = { arrIds:["id1", "id2"] } - получить кучу VM товаров по массиву их id
        addSale: root_route + "/api/product/addSale",    // POST, admin, form[productId, saleId] - добавляет saleId в массив sales объекта product
        removeSale: root_route + "/api/product/removeSale", // POST, admin, form[productId, saleId] - удаляет saleId из массива sales объекта product
        changePopular: root_route + "api/product/changePopular/{id}", // POST - измененить popular у товара
    },
    staticPages: {
        get: root_route + "/api/staticPage/getContent/:name",   // GET, req.params.name - получить HTML контент статической страницы по её названию (одно из about, delivery, contacts, partnership, qasection, sertificates)
        set: root_route + "/api/staticPage/setContent/",        // POST, admin, form[pageName, content] - записать HTML страницы в БД
    },
    orders: {
        confirm: root_route + "/api/order/confirmOrder", // POST, [items*, email, name?, phone, address?] - оформить заказ по данным из корзины* + заполненной формы
        check: root_route + "/api/order/check",        // POST, [email, id] - проверить заказ по email и id
        cancel: root_route + "/api/order/cancel",        // POST, [email, id] - отменить заказ по email и id (объекту order будет установлен флаг cancelled = true
        allByEmail: root_route + "/api/order/allByEmail/", // POST, account, form[email] - только для аккаунта - получить все заказы, привязанные к данному email
        admin_allByEmail: root_route + "/api/order/admin/allByEmail/", // POST, admin, form[email],  - только для админа - получить все заказы, привязанные к данному email
        setStatus: root_route + "/api/order/admin/setStatus",    // POST, admin, form[status, id] - изменение статуса заказа

        create: root_route + "/api/order/admin/create",   // POST, admin, form[items*, email, name, phone, address] - создание заказа из админки (не нужно)
        read: root_route + "/api/order/admin/read/:id", // GET, admin, req.params.id - получить заказ по id
        readAll: root_route + "/api/order/admin/readAll",  // GET, admin - получить все заказы
        update: root_route + "/api/order/admin/update",   // POST, admin, form[_id, items*, status, email, name, phone, address, date] - обновить данные заказа
        delete: root_route + "/api/order/admin/delete",   // POST, admin, form[_id] - удалить заказ
    },
    stock: {
        get: root_route + "/api/stock/",     // GET, admin - получить весь объект склада
        getById: root_route + "/api/stock/:id",  // GET, admin, params.id - получить склад по товару (id)
        setProduct: root_route + "/api/stock/setProduct",       // POST, admin, form[id, value] - установить значение товара на складе
        resetProductById: root_route + "/api/stock/resetProduct/:id", // POST, admin, params.id - сбросить значение товара на складе в 0
        incrementProduct: root_route + "/api/stock/incrementProduct/:id", // POST, admin, params.id - увеличить значение на складе на 1
        increaseProduct: root_route + "/api/stock/increaseProduct",      // POST, admin, form[id, value] - увеличить значение на складе на value
        decrementProduct: root_route + "/api/stock/decrementProduct/:id", // POST, admin, params.id - уменьшить значение на складе на 1
        decreaseProduct: root_route + "/api/stock/decreaseProduct",      // POST, admin, form[id, value] - уменьшить значение на складе на value
    },
    account: {
        create: root_route + "/api/account/",           // POST, admin, form[email, name, password] - создать аккаунт из админки (человек создаёт с помощью auth/register
        read: root_route + "/api/account/:id",        // GET, account, req.params.id - авторизованный может считать акк по id
        readByAdmin: root_route + "/api/account/admin/:id",  // GET, admin, req.params.id - админ тожн может считать аккаунт
        edit: root_route + "/api/account/edit",       // POST, admin, form[_id, email, name, password] - админ редактирует мета-данные аккаунта
        delete: root_route + "/api/account/delete",     // POST, admin, form[_id] - удаление аккаунта
        getMeta: root_route + "/api/account/get/meta",       // GET, account - получение метаданных - email, name (береётся по id из сессии, поэтому параметры не нужны)
        all: root_route + "/api/account/admin/get/all",        // GET, admin - список всех аккаунтов
        allLight: root_route + "/api/account/admin/get/allLight",   // GET, admin - список всех аккаунтов, но в лёгком представлении (без коризны, заказов и списка желаемого)

        cart_send: root_route + "/api/account/cart/sendCart/",     // POST, account, JSON[*] -отправка корзины из LocalStorage в БД для привязки к аккаунту
        cart_read: root_route + "/api/account/cart/readCart",      // GET, account - чтение корзины из БД - аккаунта
        cart_add: root_route + "/api/account/cart/addToCart/",         // POST, account, req.params.id - добавить товар по id в корзину
        cart_remove: root_route + "/api/account/cart/removeFromCart/:id",    // POST, account, req.params.id - удалить товар из корзины
        cart_clear: root_route + "/api/account/cart/clearCart",     // POST, account - очистить корзину
        cart_confirmOrder: root_route + "/api/account/cart/confirmOrder",  // POST, account - создать заказ из корзины аккаунта

        order_all: root_route + "/api/account/order/getAllOrders",   // GET, account - получить все заказы из аккаунта
        order_byId: root_route + "/api/account/order/getOrder/:id",   // GET, account, req.params.id - получить конкретный заказ из аккаунта

        wishlist_get: root_route + "/api/account/wishlist/getWishlist",   // GET, account - получить список желаемого
        wishlist_add: root_route + "/api/account/wishlist/addToWishlist/:id",   // POST, account, req.params.id - добавить товар в список желаемого (по id)
        wishlist_remove: root_route + "/api/account/wishlist/removeFromWishlist",   // POST, account, req.params.id - убрать товар из списка желаемого (по id)
        wishlist_clear: root_route + "/api/account/wishlist/clearWishlist",   // POST, account - очистить список желаемого
    },
    auth: {
        checkIsAuth: root_route + "/auth/checkIsAuth",   // GET - проверка, что аккаунт залогинен
        checkIsAdm: root_route + "/auth/checkIsAdm",    // GET - проверка, что админ залогинен
        login: root_route + "/auth/login",         // POST, form[email, password] - попытка войти в аккаунт
        adminLogin: root_route + "/auth/admin/login",   // POST, form[email, password, wordv2] - попытка войти в админку
        logout: root_route + "/auth/logout",        // GET - выход из авторизации
        register: root_route + "/auth/register",      // POST, form[email, password, name] - создание Аккаунта
        getCSRFToken: root_route + "/auth/getCSRFToken",    // GET - получение CSRF токена

        // почта
        confirmAccountEmail: root_route + "/auth/confirmAccountEmail/:token", // GET, req.params.token - подтверждение (будет нажато человеком из почты)
        reset: root_route + "/auth/reset", // POST, form[email] - запрос на сброс пароля, после обработки запроса будет отправлено письмо с ссылкой на форму сброса и токеном
        confirmReset: root_route + "/auth/confirmReset", // POST, form[userId, password, token] - подтверждение изменения пароля
    },
    images: {
        productImagesRoot: root_route + "/api/image/getProductImagesRoot",     // GET - путь до картинок товаров
        collectionImagesRoot: root_route + "/api/image/getCollectionImagesRoot",  // GET - путь до картинок коллекций
        addProductImage: root_route + "/api/image/product/addImage",         // POST, admin - загрузить картинку товара
        addCollectionImage: root_route + "/api/image/collection/addImage",      // POST, admin - загрузить картинку коллекции
        allImages: root_route + "/api/image/",             // GET - вообще все картинки
        allProductImages: root_route + "/api/image/product",      // GET - все картинки товаров
        allCollectionImages: root_route + "/api/image/collection",   // GET - все картинки коллекций
        imgByName: root_route + "/api/image/name/:name",    // GET - объект картинки по имени
        deleteOneImage: root_route + "/api/image/delete",           // POST, admin, form[fileName] - удалить картинку по имени файла
        deleteOneProductImage: root_route + "/api/image/delete/product",   // POST, admin, form[fileName] - удалить картинку товара по имени файла
        deleteOneCollectionImage: root_route + "/api/image/delete/collection",    // POST, admin, form[fileName] - удалить картинку категории по имени файла

        updateAlt: root_route + "/api/image/updateAlt",     // POST, admin, [i_path, i_alt] - добавление alt к картинке
        removeAlt: root_route + "/api/image/removeAlt",     // POST, admin, [i_path] - удаление alt от картинки
    },
    meta: {
        getMeta: root_route + "/api/meta/", // GET, admin, - получить meta объект
        setEmails: root_route + "/api/meta/setEmails", // POST, admin, form[emailsFlag] - изменить значение флага (boolean) isEmails (отправлять/не отправлять почту)
        setLog: root_route + "/api/meta/setLog", // POST, admin, form[logFlag] - изменить значение флага (boolean) isLog (записывать логи или нет)
        setBackup: root_route + "/api/meta/setBackup", // POST, admin, form[emailsFlag] - изменить значение флага (boolean) isBackup (сохранять бэкапы или нет)
    },
    sale: {
        create: root_route + "/api/sale/",  // POST, admin, form[saleType, saleValue, saleName, saleDescription] - создать объект sale, saleType - "percent"/"number", тогда saleValue - "1 до 99"/"от 1"
        read: root_route + "/api/sale", // GET - получить все объекты sale
        edit: root_route + "/api/sale/edit",    // POST, admin, admin, form[ _id, saleType, saleValue, saleName, saleDescription] - редактирование объекта sale
        delete: root_route + "/api/sale/delete",    // POST, admin, form[_id] - удалить объект sale

        readById: root_route + "/api/sale/{id}", // GET, params - id - получить один объект sale по его id
    },
    deleted: {
        readAll:      root_route + "/api/deletedEntity/readAll/asEntities",     // GET, admin, - считать все "удалённые объекты"
        readAllAsObjects: root_route + "/api/deletedEntity/readAll/asObjects",  // GET, admin, - считать все "удалённые объекты" - содержимое объектов развёрнуто
        recoverByEntID:   root_route + "/api/deletedEntity/recoverByEid",       // POST, admin, [_id]   - _id модели deletedEntity (удалённая сущность - models/deletedEntity)
        recoverByObjID:   root_route + "/api/deletedEntity/recoverByOid",       // POST, admin, [deletedObjectId]   - _id модели удалённого объекта (account / collection / product / sale / order )
        findByEntID:  root_route + "/api/deletedEntity/find/entity/{id}",       // GET, admin, params.id - получить JSON удалённой сущности по его id
        findByObjID:  root_route + "/api/deletedEntity/find/object/{id}",       // GET, admin, params.id - получить JSON удалённого объекта по его id
        destroy:      root_route + "/api/deletedEntity/delete",                 // POST, admin, [_id] - окончательное удаление удалённой сущности по его id - после этого восстановление невозможно
    },
    backup: {
        getBackupFromServer: root_route + "/backup/download",   // GET, admin, - загрузить бэкап из сервера
    },
    contacts: {
        read: root_route + "/api/contacts/read", // GET - получить объект contacts
        change: root_route + "/api/contacts/change",    // POST - изменить объект contacts - в body должен быть JSON contacts (пример *contacts внизу)
    }
};


/*
    * - items для order - в форме это обычный текст, но полученный путём JSON.stringify объекта:

* Пример формы для загрузки картинки:
*
* Товара:
*   <div>Загрузка картинки товара</div>
    <form action='/image/product/addImage' id='uploadForm'  method='post' encType="multipart/form-data">
        <input type="file" name="imageFile" />
        <input type='submit' value='Upload!' />
    </form>

* Коллекции:
*   <div>Загрузка картинки коллекции</div>
    <form action='/image/collection/addImage' id='uploadForm'  method='post' encType="multipart/form-data">
        <input type="file" name="imageFile" />
        <input type='submit' value='Upload!' />
    </form>
 */

/*
  Контакты:

  "contacts": {
		"phone": "phone",
		"email": "email",
		"telegram": "telegram",
		"whatsapp": "whatsapp"
	}

 */
