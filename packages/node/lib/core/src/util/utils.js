"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.byteToSize = exports.sizeToByte = exports.parseUrl = exports.html = exports.match = exports.delay = void 0;
var common_1 = require("../common");
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
    return common_1.common.http.request({ url: url, method: 'GET' }).then(function (value) { return value.text(); });
}
exports.html = html;
var httpReg = /^https?:\/\//;
function parseUrl(url) {
    var _a, _b, _c, _d;
    if (!httpReg.test(url))
        return {};
    var protocol = url.split('//')[0];
    var host = (_a = url.replace(httpReg, '').split('/')) === null || _a === void 0 ? void 0 : _a[0];
    var id = (_d = (_c = (_b = url.replace(httpReg, '').split('/')) === null || _b === void 0 ? void 0 : _b[1]) === null || _c === void 0 ? void 0 : _c.split('?')) === null || _d === void 0 ? void 0 : _d[0];
    return { origin: protocol + "//" + host, id: id };
}
exports.parseUrl = parseUrl;
/**
 * 3 M -> 3096
 */
function sizeToByte(size) {
    if (typeof size === 'string') {
        var getUnit = function (unit) {
            return ({
                get b() {
                    return 1;
                },
                get k() {
                    return 1024;
                },
                get m() {
                    return this.k * 1024;
                },
                get g() {
                    return this.m * 1024;
                },
                get t() {
                    return this.g * 1024;
                },
            }[unit] || 1);
        };
        var _a = size
            .toLowerCase()
            .replace(' ', '')
            .match(/^(\d+\.?\d*)([bkmgt]?)$/), _ = _a[0], num = _a[1], unit = _a[2];
        return +num * getUnit(unit);
    }
    return size;
}
exports.sizeToByte = sizeToByte;
/**
 * 3096 -> 3k
 */
function byteToSize(byte) {
    var formatSize = function (total, persize) {
        return Math.floor((total * 100) / persize) / 100;
    };
    if (byte < sizeToByte('1k'))
        return "0";
    if (byte < sizeToByte('1m'))
        return formatSize(byte, sizeToByte('1k')) + " k";
    if (byte < sizeToByte('1g'))
        return formatSize(byte, sizeToByte('1m')) + " M";
    if (byte < sizeToByte('1t'))
        return formatSize(byte, sizeToByte('1g')) + " G";
}
exports.byteToSize = byteToSize;
function stringify(obj) {
    return Object.keys(obj)
        .map(function (key) { return key + "=" + obj[key]; })
        .join('&');
}
exports.stringify = stringify;
