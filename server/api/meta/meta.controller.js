const MetaService = require("./meta.service");

// получить мета-объект (управление функциями сайта)
module.exports.getMetaObject = async function (req, res) {
    try {
        const meta = await MetaService.getMetaDataFromDB();
        return res.status(200).json(MetaService.createMetaDbViewModel(meta));

    } catch (e) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}

// флаг почты
module.exports.setEmailsFlag = async function (req, res) {
    try {
        const {emailsFlag} = req.body;

        let boolEmailsFlag = emailsFlag === "True";

        let meta = await MetaService.getMetaDataFromDB();
        if (!meta) {
            return res.status(200).json({
                message: "no meta-object in db"
            });
        }
        meta.isEmails = boolEmailsFlag;
        await meta.save();
        const result = await MetaService.refreshMetaVars();
        if (result) {
            return res.status(200).json({
                message: "meta vars [emails] changed"
            });
        } else {
            return res.status(200).json({
                message: "meta vars [emails] not changed"
            });
        }

    } catch (e) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}

// флаг логгера
module.exports.setLoggingFlag = async function (req, res) {
    try {
        const {logFlag} = req.body;

        let boolLogFlag = logFlag === "True";

        let meta = await MetaService.getMetaDataFromDB();
        if (!meta) {
            return res.status(200).json({
                message: "no meta-object in db"
            });
        }
        meta.isLog = boolLogFlag;
        await meta.save();
        const result = await MetaService.refreshMetaVars();
        if (result) {
            return res.status(200).json({
                message: "meta vars [log] changed"
            });
        } else {
            return res.status(200).json({
                message: "meta vars [log] not changed"
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}

// флаг бэкапа
module.exports.setBackupFlag = async function (req, res) {
    try {
        const {backupFlag} = req.body;

        let boolBackupFlag = backupFlag === "True";

        let meta = await MetaService.getMetaDataFromDB();
        if (!meta) {
            return res.status(200).json({
                message: "no meta-object in db"
            });
        }
        meta.isBackup = boolBackupFlag;
        await meta.save();
        const result = await MetaService.refreshMetaVars();
        if (result) {
            return res.status(200).json({
                message: "meta vars [backup] changed"
            });
        } else {
            return res.status(200).json({
                message: "meta vars [backup] not changed"
            });
        }
    } catch (e) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}