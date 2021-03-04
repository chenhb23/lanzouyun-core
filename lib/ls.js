"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lsShareUrl = void 0;
var util_1 = require("./util");
var request_1 = require("./request");
var download_1 = require("./download");
/**
 * 列出分享文件
 */
function lsShareUrl(option) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, origin, shareHTML, iframe, data, ls, fid, file, html_1, list, rest, response, html_2, list, rest, isPwd, title, lx, uid, rep, t, k, up, pg, response;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = util_1.parseUrl(option.url), id = _a.id, origin = _a.origin;
                    return [4 /*yield*/, util_1.html(option.url)];
                case 1:
                    shareHTML = _c.sent();
                    iframe = util_1.match.iframe(shareHTML);
                    data = util_1.match.data(shareHTML);
                    ls = util_1.match.ls(shareHTML);
                    fid = util_1.match.fid(shareHTML);
                    file = {
                        name: '',
                        size: '',
                        id: id,
                        url: option.url,
                        pwd: option.pwd,
                        type: 'file',
                        html: shareHTML,
                        list: [],
                    };
                    if (!iframe) return [3 /*break*/, 2];
                    file.name = util_1.match.titleWithoutPwd(shareHTML);
                    file.size = util_1.match.sizeWithoutPwd(shareHTML);
                    html_1 = file.html, list = file.list, rest = __rest(file, ["html", "list"]);
                    file.list = [rest];
                    return [2 /*return*/, file
                        // 密码文件
                    ];
                case 2:
                    if (!data) return [3 /*break*/, 4];
                    if (!option.pwd)
                        throw new Error('密码为空');
                    return [4 /*yield*/, request_1.request(origin + "/ajaxm.php", {
                            method: 'POST',
                            headers: { referer: option.url },
                            body: data + option.pwd,
                        })];
                case 3:
                    response = (_c.sent()).response;
                    file.name = response.inf;
                    file.size = util_1.match.sizeWithPwd(shareHTML);
                    html_2 = file.html, list = file.list, rest = __rest(file, ["html", "list"]);
                    file.list = [rest];
                    return [2 /*return*/, file
                        // [密码]文件夹
                    ];
                case 4:
                    if (!fid) return [3 /*break*/, 11];
                    isPwd = !!ls;
                    if (isPwd && !option.pwd)
                        throw new Error('密码为空');
                    title = util_1.match.title(shareHTML);
                    lx = util_1.match.lx(shareHTML);
                    uid = util_1.match.uid(shareHTML);
                    rep = util_1.match.rep(shareHTML);
                    t = util_1.match.t(shareHTML);
                    k = util_1.match.k(shareHTML);
                    up = util_1.match.up(shareHTML);
                    pg = 1;
                    file.type = 'dir';
                    file.name = title;
                    _c.label = 5;
                case 5:
                    if (!true) return [3 /*break*/, 10];
                    return [4 /*yield*/, request_1.request(origin + "/filemoreajax.php", {
                            method: 'POST',
                            body: __assign({ lx: lx, fid: fid, uid: uid, rep: rep, t: t, k: k, up: up, pg: pg++ }, (isPwd ? { ls: ls, pwd: option.pwd } : {})),
                        })];
                case 6:
                    response = (_c.sent()).response;
                    if (!(response.zt == 1 && response.text.length)) return [3 /*break*/, 8];
                    (_b = file.list).push.apply(_b, response.text.map(function (item) {
                        var url = origin + "/" + item.id;
                        var id = util_1.parseUrl(url).id;
                        return { name: item.name_all, id: id, url: url, size: item.size, type: 'file', pwd: '' };
                    }));
                    return [4 /*yield*/, util_1.delay(2000)];
                case 7:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 8: return [3 /*break*/, 10];
                case 9:
                    if (option.limit > 0 && pg > option.limit)
                        return [3 /*break*/, 10];
                    return [3 /*break*/, 5];
                case 10: return [2 /*return*/, file];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.lsShareUrl = lsShareUrl;
var option = { url: 'https://wws.lanzous.com/b01u134hc', pwd: 'a02g' }; // 图片
// const option = {url: 'https://wws.lanzous.com/b01tpeg7i'} // pan
// const option = {url: 'https://wws.lanzous.com/iwsPQmg5sfg', pwd: 'g24j'} // pwd file
// const option = {url: 'https://wws.lanzous.com/iIsdEmg3iti'} // 压缩文件
// const option = {url: 'https://wws.lanzous.com/b01tpej7g', pwd: '8cup'} // 165
lsShareUrl(option).then(function (value) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, item, handle;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _i = 0, _a = value.list;
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                item = _a[_i];
                handle = download_1.download(__assign(__assign({}, item), { path: item.name, onStateChange: function (value1) {
                        console.log(value1);
                    } }));
                return [4 /*yield*/, handle.promise];
            case 2:
                _b.sent();
                console.log("finish: ", item.name);
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); });
