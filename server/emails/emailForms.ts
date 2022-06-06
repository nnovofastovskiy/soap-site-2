import { keys } from "../keys/keys";

// письмо после регистрации и письмо подтверждения email - объеденены, отдельное подтверждение по истечению срока -
// confirmEmail
export const register = function (email: string, token: string) {
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

// письмо подтверждающее email пользователя
export const confirmEmail = function (email:string, token: string) {
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

// форма письма, отправляемого при сбросе пароля:
export const resetPassword = function (email: string, token: string) {
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