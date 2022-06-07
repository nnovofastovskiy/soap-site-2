// change
const ContactsService = require("./contactsService");
const LoggerService = require("../../common/logger/loggerService");



module.exports.readContacts = async function (req, res) {
    try {
        const contacts = await ContactsService.readContacts();
        const result = ContactsService.createContactsViewModel(contacts);
        res.status(200).json(result);
    } catch (e) {
        LoggerService.serverLoggerWrite( "error",`api/contacts/read/[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.changeContacts = async function (req, res) {
    try {
        const result = await ContactsService.updateContacts(req.body.contacts);

        LoggerService.serverLoggerWrite("info", `api/contacts/change/[POST] - contacts changed;`);
        res.status(200).json(result);
    } catch (e) {
        LoggerService.serverLoggerWrite( "error",`api/contacts/change/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}