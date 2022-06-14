const Contacts = require('./contacts.model');

// CRUD (single instance)
module.exports.createContacts = async function (candidate) {
    const contacts = new Contacts({
        phone: candidate.phone,
        email: candidate.email,
        telegram: candidate.telegram,
        whatsapp: candidate.whatsapp
    });
    await contacts.save();
    return contacts;
}

module.exports.readContacts = async function () {
    return await Contacts.findOne({});
}

module.exports.updateContacts = async function (candidate) {
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
}

module.exports.deleteContacts = async function () {
    const result = await Contacts.deleteMany({});
    return result.deletedCount > 0;
}

// ViewModel
module.exports.createContactsViewModel = function(contacts) {
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
}