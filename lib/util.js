"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = exports.html = exports.match = exports.delay = void 0;
var request_1 = require("./request");
/**
 * 延时函数
 */
var delay = function (ms) {
    if (ms === void 0) { ms = 1000; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.delay = delay;
function matchByReg(html, pattern) {
    var result = html.match(pattern);
    return result === null || result === void 0 ? void 0 : result[1];
}
exports.match = {
    iframe: function (html) { return matchByReg(html, new RegExp('<iframe[^<>]*src="([/?a-zA-Z0-9_]{9,}?)"[^<>]*>')); },
    sign: function (html) { return matchByReg(html, new RegExp("'sign':'(.*?)'")); },
    signs: function (html) { return matchByReg(html, new RegExp("var ajaxdata = '(.*?)';")); },
    websign: function (html) { return matchByReg(html, new RegExp("'websign':'(.*?)'")); },
    ves: function (html) { return matchByReg(html, new RegExp("'ves':(.*?),'")); },
    t: function (html) {
        var varName = matchByReg(html, new RegExp("'t':(.*?),"));
        if (varName) {
            return matchByReg(html, new RegExp("var " + varName + " = '(.*?)';"));
        }
    },
    k: function (html) {
        var varName = matchByReg(html, new RegExp("'k':(.*?),"));
        if (varName) {
            return matchByReg(html, new RegExp("var " + varName + " = '(.*?)';"));
        }
    },
    lx: function (html) { return matchByReg(html, new RegExp("'lx':(.*?),")); },
    fid: function (html) { return matchByReg(html, new RegExp("'fid':(.*?),")); },
    uid: function (html) { return matchByReg(html, new RegExp("'uid':'(.*?)',")); },
    rep: function (html) { return matchByReg(html, new RegExp("'rep':'(.*?)',")); },
    up: function (html) { return matchByReg(html, new RegExp("'up':(.*?),")); },
    ls: function (html) { return matchByReg(html, new RegExp("'ls':(.*?),")); },
    // + pwd
    data: function (html) { return matchByReg(html, new RegExp("data : '(.*?)'")); },
    titleWithoutPwd: function (html) { return matchByReg(html, new RegExp('0px;">(.*?)</div>')); },
    title: function (html) { return matchByReg(html, new RegExp('<title>(.*?)</title>')); },
    sizeWithoutPwd: function (html) { return matchByReg(html, new RegExp('文件大小：</span>(.*?)<br>')); },
    sizeWithPwd: function (html) { return matchByReg(html, new RegExp('大小：(.*?)</div>')); },
};
/**
 * 请求url，返回 text
 */
function html(url) {
    return request_1.request(url).then(function (value) { return value.response; });
}
exports.html = html;
function parseUrl(url) {
    var uri = new URL(url);
    return {
        origin: uri.origin,
        id: uri.pathname.replace(/^\//, ''),
    };
}
exports.parseUrl = parseUrl;
