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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lsFolder = exports.lsFile = exports.lsDir = exports.lsShareUrl = void 0;
var utils_1 = require("../util/utils");
var common_1 = require("../common");
/**
 * 列出分享文件
 */
function lsShareUrl(option) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, id, origin, shareHTML, iframe, data, ls, fid, file, html_1, list, rest, response, html_2, list, rest, isPwd, title, lx, uid, rep, t, k, up, pg, response;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = utils_1.parseUrl(option.url), id = _b.id, origin = _b.origin;
                    return [4 /*yield*/, utils_1.html(option.url)];
                case 1:
                    shareHTML = _d.sent();
                    iframe = utils_1.match.iframe(shareHTML);
                    data = utils_1.match.data(shareHTML);
                    ls = utils_1.match.ls(shareHTML);
                    fid = utils_1.match.fid(shareHTML);
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
                    file.name = utils_1.match.titleWithoutPwd(shareHTML);
                    file.size = utils_1.match.sizeWithoutPwd(shareHTML);
                    html_1 = file.html, list = file.list, rest = __rest(file, ["html", "list"]);
                    file.list = [rest];
                    return [2 /*return*/, file
                        // 密码文件
                    ];
                case 2:
                    if (!data) return [3 /*break*/, 4];
                    if (!option.pwd)
                        throw new Error('密码为空');
                    return [4 /*yield*/, common_1.common.http
                            .request({
                            url: origin + "/ajaxm.php",
                            method: 'post',
                            headers: { referer: option.url },
                            body: data + option.pwd,
                        })
                            .then(function (value) { return value.json(); })];
                case 3:
                    response = _d.sent();
                    file.name = response.inf;
                    file.size = utils_1.match.sizeWithPwd(shareHTML);
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
                    title = utils_1.match.title(shareHTML);
                    lx = utils_1.match.lx(shareHTML);
                    uid = utils_1.match.uid(shareHTML);
                    rep = utils_1.match.rep(shareHTML);
                    t = utils_1.match.t(shareHTML);
                    k = utils_1.match.k(shareHTML);
                    up = utils_1.match.up(shareHTML);
                    pg = 1;
                    file.type = 'directory';
                    file.name = title;
                    _d.label = 5;
                case 5:
                    if (!true) return [3 /*break*/, 10];
                    return [4 /*yield*/, common_1.common.http
                            .request({
                            url: origin + "/filemoreajax.php",
                            method: 'post',
                            body: __assign({ lx: lx, fid: fid, uid: uid, rep: rep, t: t, k: k, up: up, pg: pg++ }, (isPwd ? { ls: ls, pwd: option.pwd } : {})),
                        })
                            .then(function (value) { return value.json(); })];
                case 6:
                    response = _d.sent();
                    if (!(response.zt == 1 && ((_a = response.text) === null || _a === void 0 ? void 0 : _a.length))) return [3 /*break*/, 8];
                    (_c = file.list).push.apply(_c, response.text.map(function (item) {
                        var url = origin + "/" + item.id;
                        var id = utils_1.parseUrl(url).id;
                        return { name: item.name_all, id: id, url: url, size: item.size, type: 'file', pwd: '' };
                    }));
                    return [4 /*yield*/, utils_1.delay(2000)];
                case 7:
                    _d.sent();
                    return [3 /*break*/, 9];
                case 8: return [3 /*break*/, 10];
                case 9:
                    if (option.limit > 0 && pg > option.limit)
                        return [3 /*break*/, 10];
                    return [3 /*break*/, 5];
                case 10: return [2 /*return*/, file];
                case 11: throw new Error('页面解析出错，文件可能取消分享了');
            }
        });
    });
}
exports.lsShareUrl = lsShareUrl;
function lsDir(folderId) {
    return common_1.common.http
        .request({
        url: 'https://up.woozooo.com/doupload.php',
        method: 'post',
        body: { task: 47, folder_id: folderId },
    })
        .then(function (value) { return value.json(); })
        .then(function (response) {
        var _a, _b, _c;
        return (_c = (_b = (_a = response.text) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.call(_a, function (value) { return ({
            type: 'directory',
            folderId: value.fol_id,
            name: value.name,
            description: value.folder_des,
            id: '',
            url: '',
            pwd: '',
        }); })) !== null && _c !== void 0 ? _c : [];
    });
}
exports.lsDir = lsDir;
function lsFile(folderId, limit) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var pg, list, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pg = 1;
                    list = [];
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, common_1.common.http
                            .request({
                            url: 'https://up.woozooo.com/doupload.php',
                            method: 'post',
                            body: { task: 5, folder_id: folderId, pg: pg++ },
                        })
                            .then(function (value) { return value.json(); })];
                case 2:
                    response = _b.sent();
                    if (response.zt == 1 && ((_a = response.text) === null || _a === void 0 ? void 0 : _a.length)) {
                        list.push.apply(list, response.text.map(function (value) { return ({
                            type: 'file',
                            fileId: value.id,
                            name: value.name_all,
                            downs: value.downs,
                            size: value.size,
                            time: value.time,
                            pwd: '',
                            url: '',
                            id: '',
                        }); }));
                    }
                    else
                        return [3 /*break*/, 3];
                    if (limit > 0 && pg > limit)
                        return [3 /*break*/, 3];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, list];
            }
        });
    });
}
exports.lsFile = lsFile;
/**
 * 列出文件夹下的 文件夹和文件
 * @example
 ```
 await lsFolder({folderId, limit: 1})
 ```
 */
function lsFolder(option) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, dir, file;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([lsDir(option.folderId), lsFile(option.folderId, option.limit)])];
                case 1:
                    _a = _b.sent(), dir = _a[0], file = _a[1];
                    return [2 /*return*/, __spreadArray(__spreadArray([], dir), file)];
            }
        });
    });
}
exports.lsFolder = lsFolder;
