// форма письма, отправляемого после регистрации:
const keys = require("../keys/keys");

// письмо после регистрации и письмо подтверждения email - объеденены, отдельное подтверждение по истечению срока -
// confirmEmail

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Аккаунт зарегестрирован",
        text: "text message",
        html: `
            <h1>Пользователь ${email} зарегестрирован!</h1>
            <p>Подтвердите свой e-mail — так будет удобнее управлять учётной записью.</p>
            <p> <a href="${keys.BASE_URL}/auth/confirmAccountEmail/${token}">Подтвердить!</a></p>
            <hr />
            <p>Приятных покупок!</p>
            <a href="${keys.BASE_URL}">Feel Lab</a>
        `,
    }
}