"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderErrorPage = function (res, message) {
    res.render("error-page", {
        error: message,
        cssPath: "/static/css/error-page.css"
    });
};
exports.default = renderErrorPage;
//# sourceMappingURL=renderErrorPage.js.map