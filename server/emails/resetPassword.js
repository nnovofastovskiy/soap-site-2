// форма письма, отправляемого при сбросе пароля:
const keys = require("../keys/keys");

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Изменение пароля",
        text: "text message",
        html:  `
            <h1>Вы хотите изменить пароль?</h1>
            <p>Если нет, то проигнорируйте данное письмо</p>
            <p>Иначе нажмите на ссылку ниже:</p>
            <p> <a href="${keys.BASE_URL}/resetPasswordS2/${token}">Изменить пароль</a></p>

            <hr />
            <a href="${keys.BASE_URL}">Feel Lab</a>
        `,
    }
}