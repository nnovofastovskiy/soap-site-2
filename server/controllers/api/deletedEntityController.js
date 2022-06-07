const DeleteService = require("../../services/mongodb/deletedEntityService");
const LoggerService = require("../../services/loggerService");

// read all as entities
module.exports.readAllAsEntities = async function(req, res) {
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
}

// read all as objects
module.exports.readAllAsObjects = async function(req, res) {
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
}

// recover by entity id
module.exports.recoverByEntityId = async function(req, res) {
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
}

// recover by object id
module.exports.recoverByObjectId = async function(req, res) {
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
}

// find by object id
module.exports.findByObjectId = async function(req, res) {
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
}

// find by entity id
module.exports.findByEntityId = async function(req, res) {
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
}

// delete (destroy)
module.exports.destroy = async function(req, res) {
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
}


