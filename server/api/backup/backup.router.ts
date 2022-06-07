const {Router} = require('express');
const controller = require('./backupController');

const router = Router();

router.get("/download", controller.download)

module.exports = router;