const express = require('express');
const next = require('next');
const path = require('path');
const mongoose = require('mongoose');
const keys = require("./keys/keys");


// роуты API
const authRoutes = require("./routes/authRouter");
const backupRoutes = require("./routes/backupRouter");
const collectionRoutes = require("./routes/api/collectionRouter");
const contactsRoutes = require("./routes/api/contactsRouter");
const imageRoutes = require("./routes/api/imagesRouter");
const metaRoutes = require("./routes/api/metaRouter");
const orderRoutes = require("./routes/api/orderRouter");
const productRoutes = require("./routes/api/productRouter");
const saleRoutes = require("./routes/api/saleRouter");
const staticPageRoutes = require("./routes/api/staticPageRouter");
const stockRoutes = require("./routes/api/stockRouter");

// сервис изначальной инициализации
const initService = require("./common/init/init.service");




// const port = parseInt(process.env.PORT, 10) || 3000
// if ((process.env.NODE_ENV || '').trim() !== 'production') {
async function main() {
    if (!keys.DEBUG_BACKEND) {
        const dev = (process.env.NODE_ENV || '').trim() !== 'production'
        console.log((process.env.NODE_ENV || '').trim())
        const app = next({ dev })
        const handle = app.getRequestHandler()
        
        app.prepare().then(() => {
            launchServer(handle);
        })
    } else {
        await launchServer();
    }   
}



async function launchServer(allRequestHandler) {
    const server = express()

    // регистрация папки public как статической
    server.use(express.static(path.join(__dirname, "public")));
    // позволяет декодировать http запросы и получать из body. элементы
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json({ extended: true }))

    // подключаем роуты в конвейер
    server.use("/api/auth", authRoutes);
    server.use("/api/backup", backupRoutes);
    
    server.use("/api/collection", collectionRoutes);
    server.use("/api/contacts", contactsRoutes);
    server.use("/api/image", imageRoutes);
    server.use("/api/meta", metaRoutes);
    server.use("/api/order", orderRoutes);
    server.use("/api/product", productRoutes);
    server.use("/api/sale", saleRoutes);
    server.use("/api/staticPage", staticPageRoutes);
    server.use("/api/stock", stockRoutes);

    if (allRequestHandler) {
        server.all('*', (req, res) => {
            return allRequestHandler(req, res)
        });
    }

    // порт и запуск сервера
    const PORT = process.env.NEXT_PUBLIC_PORT || 3000;
    // запуск express + mongoose
    async function start() {
        try {
            await mongoose.connect(keys.MONGODB_URI, {
                useNewUrlParser: true,
                // useFindAndModify: false
            });

            // инициализация всего
            await initService.init();

            server.listen(PORT, () => {
                console.log(`Server running on port ${PORT}...`);
            });

        } catch (error) {
            console.log(error);
        }
    }
    start();
}

main().then(() => {
    console.log("server launched");
})
