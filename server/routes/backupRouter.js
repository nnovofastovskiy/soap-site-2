const {Router} = require('express');
const router = Router();

module.exports = router;

// const {Router} = require('express');
// const BackupService = require("../services/backupService");
// const LoggerService = require("../services/loggerService");
//
// const router = Router();
//
// router.get("/download", async (req, res) => {
//     try {
//         res.download(BackupService.bcPath);
//     } catch (e) {
//         LoggerService.serverLoggerWrite( "error", `backup/download/[GET] - ${e.message};`);
//         res.status(500).json({ message: "Server error" });
//     }
// })
//
// module.exports = router;