const StaticPageService = require("./staticPage.service");
const LoggerService = require("../../common/logger/loggerService");

// read
module.exports.readStaticPageContent = async function (req, res) {
    try {
        const contentHtml = await StaticPageService.readStaticPageContentByName(req.params.name);
        res.status(200).json({
            content: contentHtml
        });
    } catch (e) {
        LoggerService.serverLoggerWrite( "error",`api/staticPage/getContent/:name[GET] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}

// change
module.exports.changeStaticPageContent = async function (req, res) {
    try {
        const result = await StaticPageService.editStaticPageContent(req.body.pageName, req.body.content);

        LoggerService.serverLoggerWrite("info", `api/staticPage/setContent/[POST] - staticPage ${req.body.pageName} changed;`);
        res.status(200).json(result);
    } catch (e) {
        LoggerService.serverLoggerWrite( "error",`api/staticPage/setContent/[POST] - ${e.message};`);
        res.status(500).json({
            message: "server error:" + e.message
        });
    }
}