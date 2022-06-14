const Contacts = require('../../models/contacts');

// CRUD (single instance)
module.exports.createContacts = async function (candidate) {
    try {
        const contacts = new Contacts({
            phone: candidate.phone,
            email: candidate.email,
            telegram: candidate.telegram,
            whatsapp: candidate.whatsapp
        });
        await contacts.save();
        return contacts;

    } catch (e) {
        throw e;
    }
}

module.exports.readContacts = async function () {
    try {
        return await Contacts.findOne({});
    } catch (e) {
        throw e;
    }
}

module.exports.updateContacts = async function (candidate) {
    try {
        const currentContacts = await Contacts.findOne({});
        if (currentContacts) {
            currentContacts.phone = candidate.phone;
            currentContacts.email = candidate.email;
            currentContacts.telegram = candidate.telegram;
            currentContacts.whatsapp = candidate.whatsapp;
            await currentContacts.save();
            return currentContacts;

        } else {
            const contacts = new Contacts({
                phone: candidate.phone,
                email: candidate.email,
                telegram: candidate.telegram,
                whatsapp: candidate.whatsapp
            });
            await contacts.save();
            return contacts;
        }
    } catch (e) {
        throw e;
    }
}

module.exports.deleteContacts = async function () {
    try {
        return await Contacts.deleteMany({});
    } catch (e) {
        throw e;
    }
}

// ViewModel
module.exports.createContactsViewModel = function(contacts) {
    try {
        if (contacts) {
            return {
                phone: contacts.phone,
                email: contacts.email,
                telegram: contacts.telegram,
                whatsapp: contacts.whatsapp
            }
        } else {
            return {};
        }
    } catch (e) {
        throw e;
    }
}