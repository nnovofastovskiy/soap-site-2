// письмо подтверждающее email пользователя

const keys = require("../keys/keys");

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Подтверждение email",
        text: "text message",
        html:  `
            <h1>Подтверждение email</h1>
            <p>Подтвердите свой e-mail — так будет удобнее управлять учётной записью.</p>
            <p> <a href="${keys.BASE_URL}/confirmAccountEmail/${token}">Подтвердить!</a></p>

            <hr />
            <a href="${keys.BASE_URL}">Feel Lab</a>
        `,
    }
}