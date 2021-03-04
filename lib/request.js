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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.baseHeaders = void 0;
var https_1 = __importDefault(require("https"));
var form_data_1 = __importDefault(require("form-data"));
var querystring = __importStar(require("querystring"));
exports.baseHeaders = {
    accept: 'application/json, text/javascript, */*; q=0.01',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'accept-language': 'zh-CN,zh;q=0.9',
    pragma: 'no-cache',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
};
function parseJson(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return str;
    }
}
/**
 * 请求函数，不用做下载
 * todo: cookie
 */
function request(url, _a) {
    if (_a === void 0) { _a = {}; }
    var body = _a.body, onData = _a.onData, signal = _a.signal, encoding = _a.encoding, options = __rest(_a, ["body", "onData", "signal", "encoding"]);
    return new Promise(function (resolve, reject) {
        var headers = __assign(__assign({}, exports.baseHeaders), options.headers);
        if (body instanceof form_data_1.default) {
            Object.assign(headers, body.getHeaders());
        }
        var req = https_1.default.request(url, __assign(__assign({}, options), { headers: headers }), function (res) {
            var buf = '';
            res.setEncoding(encoding);
            res.on('data', function (chunk) { return (buf += chunk); });
            res.on('end', function () { return resolve(Object.assign(res, { response: parseJson(buf) })); });
            res.on('error', reject);
        });
        if (signal) {
            signal.onabort = function () {
                req.once('abort', function () { return reject('request 取消'); });
                typeof req.abort === 'function' ? req.abort() : req.destroy();
                // reject('request 取消')
            };
        }
        if (body instanceof form_data_1.default) {
            if (typeof onData === 'function') {
                var bytes_1 = 0;
                body.on('data', function (chunk) { return onData((bytes_1 += chunk.length)); });
            }
            body.pipe(req);
        }
        else {
            if (body)
                req.write(typeof body === 'object' ? querystring.stringify(body) : body);
            req.end();
        }
    });
}
exports.request = request;
