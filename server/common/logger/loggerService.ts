// логгер состояния приложения с использованием Winston
import {createLogger, format, Logger, transports} from 'winston';
import {settings} from "../../settings";
import * as fs from 'fs/promises';
import * as path from "path";


// создаёт объект logger, который записывает данные в server.log в формате:
/*
info: Nov-12-2020 10:07:59:     Server started and running on http://localhost:3000
info: Nov-12-2020 10:08:02:     Server Sent A Hello World!
error: Nov-12-2020 10:08:05:    500 - Internal Server Error - y is not defined - /calc - GET - ::1
error: Nov-12-2020 10:08:10:    400 || Not Found - /hello - GET - ::1
 */

// создание объекта логгера
const createCustomLogger = function (logFilePath: string) {
  return createLogger({
    transports: new transports.File({
      filename: path.join(settings.PROJECT_DIR, logFilePath),
      format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )}),
  });
};

// общий логгер для всех
const serverLogger: Logger = createCustomLogger("/logs/server.log");

export default serverLogger;

// функция чтения лога для админа из файла
export const readServerLog = async function () {
  try {
    const logData = await fs.readFile(path.join(settings.PROJECT_DIR, "/logs/server.log"), "utf8");
    return logData.split(";")

  } catch (e: any) {
    serverLogger.error(e);
  }
}
