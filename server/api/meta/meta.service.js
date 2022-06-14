// сервис управления meta моделью - всего сайта
const Meta = require("./meta.model");
let ObjectId = require('mongoose').Types.ObjectId;

// === Область БД
// Meta является синглтоном и существует всегда, поэтому CRUD не нужен как бы
// Create
module.exports.createMetaInDB = async function (candidate) {
    const meta = new Meta({
        isEmails: candidate.isEmails,
        isLog: candidate.isLog,
        isBackup: candidate.isBackup
    });

    await meta.save();
    return meta;
}

// Read - (синглтон)
module.exports.readMetaFromDB = async function (id) {
    if (ObjectId.isValid(id)) {
        return await Meta.findById(id);
    } else {
        return null;
    }
}

//Update - (синглтон)
module.exports.updateMetaInDB = async function (candidate) {
    const meta = await Meta.findById(candidate._id);
    if(meta) {
        meta.isEmails = candidate.isEmails;
        meta.isLog = candidate.isLog;
        meta.isBackup = candidate.isBackup;
        await meta.save();
        return meta;
    } else {
        return {};
    }
}

// Delete
module.exports.deleteMetaFromDB = async function (id) {
    if (ObjectId.isValid(id)) {
        return await Meta.deleteOne({_id: id});
    } else {
        return null;
    }
}

// additional
// ViewModel
module.exports.getMetaDataFromDB = async function() {
    return await Meta.findOne({});
}

module.exports.createMetaDbViewModel = function (meta) {
    if (meta) {
        return {
            isEmails: meta.isEmails,
            isLog: meta.isLog,
            isBackup: meta.isBackup
        }

    } else {
        return {};
    }
}

// инициализация объекта Meta
module.exports.metaInitInDB = async function () {
    let meta = new Meta({
        isEmails: true,
        isLog: true,
        isBackup: true
    });
    await meta.save();
    return meta;
}

module.exports.metaAllTrue = async function () {
    let meta = await Meta.findOne({});
    if (meta) {
        meta.isEmails = true;
        meta.isLog = true;
        meta.isBackup = true;
        await meta.save();

        return true;

    } else {
        return false;
    }
}

module.exports.metaEmailToFalse = async function () {
    let meta = await Meta.findOne({});
    if (meta) {
        meta.isEmails = false;
        meta.isLog = true;
        meta.isBackup = true;
        await meta.save();

        return true;

    } else {
        return false;
    }
}

module.exports.metaAllFalse = async function() {
    let meta = await Meta.findOne({});
    if (meta) {
        meta.isEmails = false;
        meta.isLog = false;
        meta.isBackup = false;
        await meta.save();

        return true;

    } else {
        return false;
    }
}

// проверка - meta существует?
module.exports.isMetaExistsInDB = async function () {
    const meta = await Meta.findOne({})
    if (meta)
        return true;
    else
        return false;

}



// ======================== Область переменных
let metaIsEmails = false;
let metaIsLog = false;
let metaIsBackup = false;

// обновить переменные из БД
module.exports.refreshMetaVars = async function () {
    const meta = await Meta.findOne({});
    if (meta) {
        metaIsEmails = meta.isEmails;
        metaIsLog = meta.isLog;
        metaIsBackup = meta.isBackup;

        return true;
    } else {
        return false;
    }
}

module.exports.isEmails = function () {
    return metaIsEmails;
}

module.exports.isLog = function () {
    return metaIsLog;
}

module.exports.isBackup = function () {
    return metaIsBackup;
}


