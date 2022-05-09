const BackupService = require("../services/backupService");
const LoggerService = require("../services/loggerService");

module.exports.download = async function (req, res) {
    try {
        res.download(BackupService.bcPath);

    } catch (e) {
        LoggerService.serverLoggerWrite( "error", `backup/download/[GET] - ${e.message};`);
        res.status(500).json({ message: "Server error" });
    }
}