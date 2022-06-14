// логгер состояния приложения с использованием Winston
const { createLogger, format, transports } = require('winston');
const settings = require("../../settings");
const fs = require("fs").promises;
const path = require("path");

//const logFilePath = path.join(settings.PROJECT_DIR, "/logs/server.log");
//module.exports.serverLogFile = path.join(settings.PROJECT_DIR, "/logs/server.log");

// создаёт объект logger, который записывает данные в server.log в формате:
/*
info: Nov-12-2020 10:07:59:     Server started and running on http://localhost:3000
info: Nov-12-2020 10:08:02:     Server Sent A Hello World!
error: Nov-12-2020 10:08:05:    500 - Internal Server Error - y is not defined - /calc - GET - ::1
error: Nov-12-2020 10:08:10:    400 || Not Found - /hello - GET - ::1
 */


// создание объекта логгера
function createCustomLogger(logFilePath) {
    return createLogger({
        transports: new transports.File({
            filename: path.join(settings.PROJECT_DIR, logFilePath),
            format:format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),
    });    
};

// общий логгер для всех
module.exports = createCustomLogger("/logs/server.log");


module.exports.readServerLog = async function () {
    try {
        // асинхронное чтение
        const logData = await fs.readFile(path.join(settings.PROJECT_DIR, "/logs/server.log"), "utf8");
        return logData.split(";")

    } catch (e) {
        console.log(e);
    }
}
