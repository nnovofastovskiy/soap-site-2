const {Router} = require('express');
const controller = require('./backup.controller');

const router = Router();

router.get("/download", controller.download)

module.exports = router;