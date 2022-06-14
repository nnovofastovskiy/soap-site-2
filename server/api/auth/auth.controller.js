const keys = require("../../keys/keys");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const AccountService = require("../services/mongodb/accountService");
const Account = require("../models/account");
const EmailService = require("../services/emailService");
const MetaService = require("../meta/meta.service");
const LoggerService = require("../../common/logger/loggerService");

// login
module.exports.login = async function(req, res) {
    try {
        const {email, password} = req.body;

        const account = await AccountService.readAccountByEmail(email);
        if (account) {
            const areSame = await bcrypt.compare(password, account.password);
            if (areSame) {
                req.session.account = account;
                req.session.isAccount = true;
                res.status(200).json({ email: email, name: req.session.account.name });
            } else {
                res.status(200).json({
                    message: "Неправильный пароль"
                });
            }

        } else {
            res.status(200).json({
                message: "Email not found"
            });
        }
    } catch (e) {
        LoggerService.serverLoggerWrite( "error", `auth/login/[POST] - ${e.message};`);
        res.status(500).json({ message: "Server error" });
    }
}

// admin-login
module.exports.adminLogin = async function(req, res) {
    try {
        const {email, password, wordv2} = req.body;

        // проверка на ADMIN_EMAIL, ADMIN_PASS, ADMIN_W2
        if (email === keys.ADMIN_EMAIL &&
            password === keys.ADMIN_PASS &&
            wordv2 === keys.ADMIN_W2) {

            req.session.isAdmin = true;

            res.status(200).json({ message: "OK" });
        } else {
            res.status(200).json({ message: "Login as admin failed" });

        }
    } catch (e) {
        LoggerService.serverLoggerWrite( "error", `auth/admin/login/[POST] - ${e.message};`);
        res.status(500).json({ message: "Server error" });
    }
}

// logout
module.exports.logout = async function(req, res) {
    try {
        req.session.destroy(() => {
            // чистка БД
        });
        res.status(200).json({ message: "OK" });
    } catch (e) {
        LoggerService.serverLoggerWrite( "error", `auth/logout/[GET] - ${e.message};`);
        res.status(500).json({message: "Server error"});
    }
}

// register
module.exports.register = async function(req, res) {
    try {
        // регистрируем нового пользователя
        const {email, password, name} = req.body;

        // проверяем на email
        const isEmailExists = await AccountService.checkForEmailInDb(email);
        if (!isEmailExists) {

            // шифрованный пароль
            const hashPassword = await bcrypt.hash(password, 10);

            // создаём пользователя
            const account = await AccountService.createAccount({
                email: email,
                name: name,
                password: hashPassword,
                verified: false
            });

            const isEmails = MetaService.isEmails();
            if (isEmails) {
                // генерируем рандомный ключ
                crypto.randomBytes(32, async (error, buffer) => {
                    // получаем токен
                    const token = buffer.toString('hex');

                    // генерируем токен и прикрепляем в БД
                    account.emailToken = token;
                    account.emailTokenExp = Date.now() + 72 * 60 * 60 * 1000;  // жизнь токена 72 часа
                    await account.save();
                    LoggerService.serverLoggerWrite( "info", `auth/register/[POST] - account [${email}, ${name}] created (email was sent);`);
                    res.status(200).json({
                        message: "account created (email was sent)",
                    });

                    // отправляем письмо
                    await EmailService.sendEmail_AccountRegistered(email, token);
                });

            } else {
                await account.save();
                LoggerService.serverLoggerWrite( "info", `auth/register/[POST] - account [${email}, ${name}] created;`);
                res.status(200).json({
                    message: "account created",
                });
            }
        } else {
            LoggerService.serverLoggerWrite( "info", `auth/register/[POST] - account [${email}, ${name}] not created - email already used;`);
            res.status(200).json({
                message: "email already used",
            });
        }

    } catch (e) {
        LoggerService.serverLoggerWrite( "error", `auth/register/[POST] - ${e.message};`);
        res.status(500).json({ message: "Server error" });
    }
}

// confirmAccount
module.exports.confirmAccountEmail = async function(req, res) {
    try {
        const account = await Account.findOne({emailToken: req.params.token, emailTokenExp: {$gt: Date.now()}});
        if (account) {
            account.verified = true;
            account.emailToken = undefined;
            account.emailTokenExp = undefined;
            await account.save();
            LoggerService.serverLoggerWrite( "info", `auth/confirmAccountEmail/:token[GET] - account [${account.email}] verified;`);
            res.status(200).json({
                message: `account's email : ${account.email} verified!`
            });
        } else {
            res.status(200).json({
                message: "no account with that token"
            });
        }
    } catch (e) {
        LoggerService.serverLoggerWrite( "error", `auth/confirmAccountEmail/:token[GET] - ${e.message};`);
        res.status(500).json({ message: "Server error" });
    }
}

// resetPassword
module.exports.resetPassword = async function(req, res) {
    try {
        // генерируем рандомный ключ
        crypto.randomBytes(32, async (error, buffer) => {

            // получаем токен
            const token = buffer.toString('hex');
            // проверка что email, сбрасывающий пароль вообще существует как пользователь
            const candidate = await AccountService.readAccountByEmail(req.body.email);

            if (candidate) {
                const isEmails = MetaService.isEmails();
                if (isEmails) {
                    // генерируем токен и прикрепляем в БД
                    candidate.resetToken = token;
                    candidate.resetTokenExp = Date.now() + 60*60*1000;  // жизнь токена 1 час
                    await candidate.save();

                    LoggerService.serverLoggerWrite( "info", `auth/reset/[POST] - account [${candidate.email}] resets password;`);
                    res.status(200).json({
                        message: "reset mail was sent",
                    });
                    // отправляем письмо
                    await EmailService.sendEmail_ChangePassword(candidate.email, token);
                } else {
                    res.status(200).json({
                        message: "cannot reset - isEmail = false",
                    });
                }
            } else {
                res.status(200).json({
                    message: "no account"
                });
            }
        })

    } catch (e) {
        LoggerService.serverLoggerWrite( "error", `auth/reset/[POST] - ${e.message};`);
        res.status(500).json({ message: "Server error" });
    }
}

// confirm Reset password
module.exports.confirmResetPassword = async function(req, res) {
    try {
        const account = await Account.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: {$gt: Date.now()}
        })

        if (account) {
            account.password = await bcrypt.hash(req.body.password, 10);
            account.resetToken = undefined;
            account.resetTokenExp = undefined;
            await account.save();
            LoggerService.serverLoggerWrite( "info", `auth/confirmReset/[POST] - account [${account.email}] confirm reset password;`);
            res.status(200).json({
                message: "password was changed!"
            });

        } else {
            res.status(200).json({
                message: "something goes wrong! try again!"
            });
        }
    } catch (e) {
        LoggerService.serverLoggerWrite( "error", `auth/confirmReset/[POST] - ${e.message};`);
        res.status(500).json({ message: "Server error" });
    }
}