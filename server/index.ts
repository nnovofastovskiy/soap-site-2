import express from 'express';
import next from 'next';
import path from 'path';
import mongoose from 'mongoose';
import { keys } from "./keys/keys";


// роуты API
const accountRoutes = require("./routes/api/accountRouter");
const collectionRoutes = require("./routes/api/collectionRouter");
const orderRoutes = require("./api/order/orderRouter");
const productRoutes = require("./api/product/productRouter");
const staticPageRoutes = require("./api/staticPage/staticPageRouter");
const stockRoutes = require("./api/stock/stockRouter");
const metaRoutes = require("./api/meta/metaRouter");
const saleRoutes = require("./api/sale/saleRouter");
const imageRoutes = require("./api/images/imagesRouter");
const deletedRoutes = require("./routes/api/deletedEntityRouter");
const backupRouter = require("./api/backup/backupRouter");
const contactsRoutes = require("./api/contacts/contactsRouter");

// роуты страниц и админа
const authRoutes = require("./api/auth/authRouter");


// сервис изначальной инициализации
const initService = require("./common/init/initService");




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
  server.use(express.json())

  // подключаем роуты в конвейер
  server.use("/auth", authRoutes);
  server.use("/backup", backupRouter);

  server.use("/api/image", imageRoutes);
  server.use("/api/account", accountRoutes);
  server.use("/api/collection", collectionRoutes);
  server.use("/api/order", orderRoutes);
  server.use("/api/product", productRoutes);
  server.use("/api/staticPage", staticPageRoutes);
  server.use("/api/stock", stockRoutes);
  server.use("/api/meta", metaRoutes);
  server.use("/api/sale", saleRoutes);
  server.use("/api/deletedEntity", deletedRoutes);
  server.use("/api/contacts", contactsRoutes);

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  // порт и запуск сервера
  const PORT = process.env.NEXT_PUBLIC_PORT || 3000;
  // запуск express + mongoose
  async function start() {
    try {
      await mongoose.connect(keys.MONGODB_URI);

      // инициализация всего
      await initService.init();

      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}...`);
      });

    } catch (error) {
      console.log(error);
    }
  }
  start().then(r => console.log('server started...'));
})