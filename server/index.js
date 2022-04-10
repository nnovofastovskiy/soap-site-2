const express = require('express');
const next = require('next');
const path = require('path');
const mongoose = require('mongoose');
const keys = require("./keys/keys");

// роуты API
const accountRoutes = require("./routes/api/accountRouter");
const collectionRoutes = require("./routes/api/collectionRouter");
const imageSetRoutes = require("./routes/api/imageSetRouter");
const metaRoutes = require("./routes/api/metaRouter");
const orderRoutes = require("./routes/api/orderRouter");
const productRoutes = require("./routes/api/productRouter");
const roleRoutes = require("./routes/api/roleRouter");
const saleRoutes = require("./routes/api/saleRouter");
const searchRoutes = require("./routes/api/searchRouter");
const staticPageRoutes = require("./routes/api/staticPageRouter");
const stockRoutes = require("./routes/api/stockRouter");
const authRoutes = require("./routes/authRouter");
const backupRouter = require("./routes/backupRouter");

// сервис изначальной инициализации
const initService = require("./services/initService");


if (keys.BACKEND_ONLY){

    // регистрация приложения
    const app = express();

    // регистрация папки public как статической
    app.use(express.static(path.join(__dirname, "public")));

    // позволяет декодировать http запросы и получать из body. элементы
    app.use(express.urlencoded({extended: true}));

    // подключаем роуты в конвейер
    app.use("/api/account", accountRoutes);
    app.use("/api/collection", collectionRoutes);
    app.use("/api/imageSet", imageSetRoutes);
    app.use("/api/meta", metaRoutes);
    app.use("/api/order", orderRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/role", roleRoutes);
    app.use("/api/staticPage", staticPageRoutes);
    app.use("/api/sale", saleRoutes);
    app.use("/api/search", searchRoutes);
    app.use("/api/stock", stockRoutes);

    app.use("/auth", authRoutes);
    app.use("/backup", backupRouter);

    // порт и запуск сервера
    // запуск express + mongoose
    async function start() {
        try {
            await mongoose.connect(keys.MONGODB_URI, {
                useNewUrlParser: true,
                // useFindAndModify: false
            });

            // инициализация всего
            await initService.init();

            app.listen(keys.NEXT_PUBLIC_PORT, () => {
                console.log(`Server running on port ${keys.NEXT_PUBLIC_PORT}...`);
            });

        } catch (error) {
            console.log(error);
        }
    }

    start();

} else {
    // const port = parseInt(process.env.PORT, 10) || 3000
    // if ((process.env.NODE_ENV || '').trim() !== 'production') {
    const dev = (process.env.NODE_ENV || '').trim() !== 'production'
    console.log((process.env.NODE_ENV || '').trim())
    const app = next({ dev })
    const handle = app.getRequestHandler()

    app.prepare().then(() => {
        const server = express()

        // регистрация папки public как статической
        server.use(express.static(path.join(__dirname, "public")));
        // позволяет декодировать http запросы и получать из body. элементы
        server.use(express.urlencoded({ extended: true }));
        server.use(express.json({ extended: true }))

        // подключаем роуты в конвейер
        server.use("/api/account", accountRoutes);
        server.use("/api/collection", collectionRoutes);
        server.use("/api/imageSet", imageSetRoutes);
        server.use("/api/meta", metaRoutes);
        server.use("/api/order", orderRoutes);
        server.use("/api/product", productRoutes);
        server.use("/api/role", roleRoutes);
        server.use("/api/staticPage", staticPageRoutes);
        server.use("/api/sale", saleRoutes);
        server.use("/api/search", searchRoutes);
        server.use("/api/stock", stockRoutes);

        server.use("/auth", authRoutes);
        server.use("/backup", backupRouter);


        server.all('*', (req, res) => {
            return handle(req, res)
        });

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
    })
}
