"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.getRealDownloadUrl = exports.getPageDownloadUrl = void 0;
var request_1 = require("./request");
var https_1 = __importDefault(require("https"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var util_1 = require("./util");
var events_1 = __importDefault(require("events"));
/**
 * 页面的下载链接（还不是 nginx 的真实下载链接）
 */
function getPageDownloadUrl(option) {
    return __awaiter(this, void 0, void 0, function () {
        var origin, shareHTML, _a, iframe, data, iframeUrl, downHTML, sign, signs, websign, ves, response, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    origin = util_1.parseUrl(option.url).origin;
                    _a = option.html;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, util_1.html(option.url)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    shareHTML = _a;
                    iframe = util_1.match.iframe(shareHTML);
                    data = util_1.match.data(shareHTML);
                    if (!iframe) return [3 /*break*/, 5];
                    iframeUrl = "" + origin + iframe;
                    return [4 /*yield*/, util_1.html(iframeUrl)];
                case 3:
                    downHTML = _b.sent();
                    sign = util_1.match.sign(downHTML);
                    signs = util_1.match.signs(downHTML);
                    websign = util_1.match.websign(downHTML);
                    ves = util_1.match.ves(downHTML);
                    return [4 /*yield*/, request_1.request(origin + "/ajaxm.php", {
                            method: 'POST',
                            headers: { referer: iframeUrl },
                            body: {
                                action: 'downprocess',
                                signs: signs,
                                sign: sign,
                                ves: ves,
                                websign: websign,
                            },
                        })];
                case 4:
                    response = (_b.sent()).response;
                    return [2 /*return*/, response.dom + "/file/" + response.url];
                case 5:
                    if (!data) return [3 /*break*/, 7];
                    if (!option.pwd)
                        throw new Error('密码为空');
                    return [4 /*yield*/, request_1.request(origin + "/ajaxm.php", {
                            method: 'POST',
                            headers: { referer: option.url },
                            body: data + option.pwd,
                        })];
                case 6:
                    response = (_b.sent()).response;
                    return [2 /*return*/, response.dom + "/file/" + response.url];
                case 7: throw new Error('页面错误');
            }
        });
    });
}
exports.getPageDownloadUrl = getPageDownloadUrl;
/**
 * 需要设置 header accept: application/octet-stream
 */
function getRealDownloadUrl(pageDownloadUrl) {
    return request_1.request(pageDownloadUrl, {
        headers: { accept: 'application/octet-stream, */*; q=0.01' },
    }).then(function (_a) {
        var headers = _a.headers;
        return headers.location;
    });
}
exports.getRealDownloadUrl = getRealDownloadUrl;
/**
 * @example
 * ```
 const handle = download({
   url,
   path: 'src/assets/test.png',
   onProgress: (resolve, total) => {
     console.log(`${resolve} / ${total}`)
   },
 })
 setTimeout(() => handle.cancel(), 1000)
 await handle.promise
 * ```
 * @param option
 */
function download(option) {
    var event = new events_1.default();
    return {
        cancel: function () {
            event.emit('cancel');
        },
        promise: new Promise(function (resolve, reject) {
            getPageDownloadUrl(option)
                .then(function (url) {
                var _a;
                (_a = option.onStateChange) === null || _a === void 0 ? void 0 : _a.call(option, { state: 1, url: url });
                return getRealDownloadUrl(url);
            })
                .then(function (realUrl) {
                var _a;
                (_a = option.onStateChange) === null || _a === void 0 ? void 0 : _a.call(option, { state: 2, url: realUrl });
                https_1.default.get(realUrl, function (res) {
                    var _a, _b, _c, _d, _e;
                    var total = +res.headers['content-length'];
                    var fileName = decodeURIComponent((_d = (_c = (_b = (_a = res.headers['content-disposition'].split(';')) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.split('filename=')) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.trim());
                    (_e = option.onStateChange) === null || _e === void 0 ? void 0 : _e.call(option, { state: 3, length: total, disposition: fileName });
                    fs_1.default.mkdirSync(path_1.default.dirname(option.path), { recursive: true });
                    var file = fs_1.default.createWriteStream(option.path);
                    var len = 0;
                    event.once('cancel', function () {
                        var _a;
                        res.destroy();
                        file.destroy();
                        reject('取消下载');
                        (_a = option.onStateChange) === null || _a === void 0 ? void 0 : _a.call(option, { state: 6 });
                    });
                    // todo: 事件节流
                    res.on('data', function (chunk) { var _a; return (_a = option.onProgress) === null || _a === void 0 ? void 0 : _a.call(option, (len += chunk.length), total); });
                    res.on('end', function () {
                        var _a;
                        file.end(); // 将内存中的内容全部写入，然后关闭文件
                        resolve();
                        (_a = option.onStateChange) === null || _a === void 0 ? void 0 : _a.call(option, { state: 4 });
                    });
                    res.on('error', function () {
                        var _a;
                        reject();
                        (_a = option.onStateChange) === null || _a === void 0 ? void 0 : _a.call(option, { state: 5 });
                    });
                    res.pipe(file);
                });
            });
        }),
    };
}
exports.download = download;
