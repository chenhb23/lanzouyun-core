"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseHeaders = exports.HttpBase = void 0;
var HttpBase = /** @class */ (function () {
    function HttpBase() {
    }
    return HttpBase;
}());
exports.HttpBase = HttpBase;
exports.baseHeaders = {
    accept: 'application/json, text/javascript, */*; q=0.01',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'accept-language': 'zh-CN,zh;q=0.9',
    pragma: 'no-cache',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
};
