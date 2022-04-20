// Роуты коллекций
const {Router} = require("express");
const DeleteService = require("../../services/mongodb/deletedEntityService");
//const MetaService = require("../../services/mongodb/metaService");
const LoggerService = require("../../services/loggerService");


const router = Router();

// ============= пример кастомного логгера ==============================
/*
// создаём объект логгера
let deletedLogger = LoggerService.createCustomLogger("/logs/deleted.log");

// функция записи в этот логгер
function deletedLoggerWrite (type, message) {
    try {
        // Логгер будет записывать только если в meta isLog установлено true
        if (MetaService.isLog()) {
            if (type === "info")
                deletedLogger.info(message);
            else if (type === "error")
                deletedLogger.error(message);
        }
    } catch (e) {
        console.log(e);
    }
}
*/

router.get("/readAll/asEntities", async (req, res) => {
    try {
        const des = await DeleteService.readAllDeletedEntities();
        let desVM = [];
        for (let de of des) {
            desVM.push(DeleteService.createDeletedEntityViewModel(de));
        }
        res.status(200).json(desVM);

    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/deletedEntity/readAll/[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
});

router.get("/readAll/asObjects", async (req, res) => {
    try {
        const des = await DeleteService.readAllDeletedEntities();
        let desVM = [];
        for (let de of des) {
            desVM.push(DeleteService.createDeletedEntityObjectViewModel(de));
        }
        res.status(200).json(desVM);

    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/deletedEntity/readAll/[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
});

router.post("/recoverByEid", async (req, res) => {
    try {
        const result = await DeleteService.recoverDeletedEntity(req.body._id);
        if (result) {
            if (!result.message) {
                res.status(200).json({status: "entity recovered"});
            } else {
                res.status(200).json(result);
            }
        } else {
            res.status(200).json({message:"recover - no result"});
        }
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/deletedEntity/recoverByEid/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
});

router.post("/recoverByOid", async (req, res) => {
    try {
        const result = await DeleteService.recoverDeletedEntityByObjectId(req.body.deletedObjectId);
        if (result) {
            if (!result.message) {
                res.status(200).json({status: "entity recovered"});
            } else {
                res.status(200).json(result);
            }
        } else {
            res.status(200).json({message:"recover - no result"});
        }
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/deletedEntity/recoverByOid/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
});

router.get("/find/object/:id", async (req, res) => {
    try {
        const result = await DeleteService.findInDeletedByObjectId(req.params.id);
        if (result) {
            res.status(200).json(DeleteService.createDeletedEntityObjectViewModel(result));
        } else {
            res.status(200).json({});
        }
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/deletedEntity/find/object/:id[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
});

router.get("/find/entity/:id", async (req, res) => {
    try {
        const result = await DeleteService.findInDeletedByEntityId(req.params.id);
        if (result) {
            res.status(200).json(DeleteService.createDeletedEntityViewModel(result));
        } else {
            res.status(200).json({});
        }
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/deletedEntity/find/entity/:id[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
});

router.post("/delete", async (req, res) => {
    try {
        const result = await DeleteService.deleteEntityById(req.body._id);
        if (result) {
            res.status(200).json({status:"deleted"});
        } else {
            res.status(200).json({message:"no delete"});
        }
    } catch (e) {
        LoggerService.serverLoggerWrite("error", `api/deletedEntity/delete/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
});


module.exports = router;