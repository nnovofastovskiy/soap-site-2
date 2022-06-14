// change
const ContactsService = require("./contacts.service");
const logger = require("../../common/logger/logger.service");



module.exports.readContacts = async function (req, res) {
    try {
        const contacts = await ContactsService.readContacts();
        const result = ContactsService.createContactsViewModel(contacts);
        return res.status(200).json(result);
    } catch (e) {
        logger.error( `api/contacts/read/[GET] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

module.exports.changeContacts = async function (req, res) {
    try {
        const result = await ContactsService.updateContacts(req.body.contacts);

        logger.info(`api/contacts/change/[POST] - contacts changed;`);
        return res.status(200).json(result);
    } catch (e) {
        logger.error( `api/contacts/change/[POST] - ${e.message};`);
        return res.status(500).json({
            message: "server error:" + e.message
        });
    }
}