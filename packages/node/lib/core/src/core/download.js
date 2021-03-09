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
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.getRealDownloadUrl = exports.getPageDownloadUrl = void 0;
var utils_1 = require("../util/utils");
var Event_1 = require("../util/Event");
var Chain_1 = require("../util/Chain");
var common_1 = require("../common");
/**
 * 页面的下载链接（还不是 nginx 的真实下载链接）
 */
function getPageDownloadUrl(option) {
    return __awaiter(this, void 0, void 0, function () {
        var origin, shareHTML, _a, iframe, data, iframeUrl, downHTML, sign, signs, websign, ves, response, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    origin = utils_1.parseUrl(option.url).origin;
                    _a = option.html;
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, utils_1.html(option.url)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    shareHTML = _a;
                    iframe = utils_1.match.iframe(shareHTML);
                    data = utils_1.match.data(shareHTML);
                    if (!iframe) return [3 /*break*/, 5];
                    iframeUrl = "" + origin + iframe;
                    return [4 /*yield*/, utils_1.html(iframeUrl)];
                case 3:
                    downHTML = _b.sent();
                    sign = utils_1.match.sign(downHTML);
                    signs = utils_1.match.signs(downHTML);
                    websign = utils_1.match.websign(downHTML);
                    ves = utils_1.match.ves(downHTML);
                    return [4 /*yield*/, common_1.common.http
                            .request({
                            url: origin + "/ajaxm.php",
                            method: 'post',
                            headers: { referer: iframeUrl },
                            body: { action: 'downprocess', signs: signs, sign: sign, ves: ves, websign: websign },
                        })
                            .then(function (value) { return value.json(); })];
                case 4:
                    response = _b.sent();
                    return [2 /*return*/, response.dom + "/file/" + response.url];
                case 5:
                    if (!data) return [3 /*break*/, 7];
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
                case 6:
                    response = _b.sent();
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
    return common_1.common.http
        .request({ url: pageDownloadUrl, method: 'GET', headers: { accept: 'application/octet-stream, */*; q=0.01' } })
        .then(function (_a) {
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
 await handle
 * ```
 * @param option
 */
function download(option) {
    var event = new Event_1.Event();
    var promise = new Promise(function (resolve, reject) {
        var chain = new Chain_1.Chain();
        event.once('cancel', function () {
            chain.cancel();
            // option.onStateChange?.({state: 6})
            reject('取消下载');
        });
        chain
            .add(function () { return getPageDownloadUrl(option); })
            .add(function (url) { var _a; return ((_a = option.onStateChange) === null || _a === void 0 ? void 0 : _a.call(option, { state: 1, url: url }), url); })
            .add(function (url) { return getRealDownloadUrl(url); })
            .add(function (realUrl) { var _a; return ((_a = option.onStateChange) === null || _a === void 0 ? void 0 : _a.call(option, { state: 2, url: realUrl }), realUrl); })
            .add(function (realUrl) {
            // todo: download
            var handle = common_1.common.http.download({
                url: realUrl,
                path: option.path,
            });
            event.once('cancel', handle.cancel);
            return handle;
            // https.get(realUrl, res => {
            //   const total = +res.headers['content-length']
            //   const fileName = decodeURIComponent(
            //     res.headers['content-disposition'].split(';')?.[1]?.split('filename=')?.[1]?.trim()
            //   )
            //   option.onStateChange?.({state: 3, length: total, disposition: fileName})
            //
            //   fs.mkdirSync(path.dirname(option.path), {recursive: true})
            //   const file = fs.createWriteStream(option.path)
            //
            //   event.once('cancel', () => {
            //     res.destroy()
            //     file.destroy()
            //   })
            //
            //   // todo: 事件节流
            //   let len = 0
            //   res.on('data', chunk => option.onProgress?.((len += chunk.length), total))
            //   res.on('end', () => {
            //     file.end() // 将内存中的内容全部写入，然后关闭文件
            //     option.onStateChange?.({state: 4})
            //     resolve()
            //   })
            //   res.on('error', () => {
            //     option.onStateChange?.({state: 5})
            //     reject()
            //   })
            //   res.pipe(file)
            // })
        })
            .start();
    });
    promise.cancel = function () { return event.emit('cancel'); };
    return promise;
}
exports.download = download;
