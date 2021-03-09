"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = void 0;
var lib_1 = require("../../../core/lib");
var rn_fetch_blob_1 = __importDefault(require("rn-fetch-blob"));
var Http = /** @class */ (function (_super) {
    __extends(Http, _super);
    function Http() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Http.prototype.request = function (options) {
        var _this = this;
        var event = new lib_1.Event();
        var promise = new Promise(function (resolve, reject) {
            var handle = rn_fetch_blob_1.default.fetch(options.method, options.url, __assign(__assign(__assign({}, lib_1.baseHeaders), { cookie: lib_1.common.auth.cookie }), options.headers), typeof options.body === 'object' ? lib_1.stringify(options.body) : options.body);
            event.once('cancel', function () {
                handle.cancel();
                reject();
            });
            handle
                .then(function (value) {
                return resolve({
                    json: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, value.json()];
                    }); }); },
                    text: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, value.text()];
                    }); }); },
                    headers: value.respInfo.headers,
                });
            })
                .catch(reject);
        });
        promise.cancel = function () { return event.emit('cancel'); };
        return promise;
    };
    Http.prototype.download = function (options) {
        var event = new lib_1.Event();
        var promise = new Promise(function (resolve, reject) {
            rn_fetch_blob_1.default.fs
                .exists(options.path)
                .then(function (exists) {
                if (!exists)
                    return rn_fetch_blob_1.default.fs.mkdir(options.path);
            })
                .then(function () {
                var handle = rn_fetch_blob_1.default.config({
                    fileCache: true,
                    path: options.path,
                }).fetch('get', options.url);
                event.once('cancel', function () {
                    handle.cancel();
                    reject();
                });
                if (typeof options.onProgress === 'function') {
                    handle.progress(options.onProgress);
                }
                handle.then(function () { return resolve(); }).catch(reject);
            });
        });
        promise.cancel = function () { return event.emit('cancel'); };
        return promise;
    };
    Http.prototype.upload = function (options) {
        var event = new lib_1.Event();
        var promise = new Promise(function (resolve, reject) {
            var handle = rn_fetch_blob_1.default.fetch('post', 'https://up.woozooo.com/fileup.php', __assign(__assign({}, lib_1.baseHeaders), { cookie: lib_1.common.auth.cookie, 'Content-Type': 'multipart/form-data' }), [
                { name: 'task', data: '1' },
                { name: 've', data: '2' },
                { name: 'lastModifiedDate', data: options.mtime.toString() },
                { name: 'type', data: 'application/octet-stream' },
                { name: 'id', data: 'WU_FILE_0' },
                { name: 'folder_id_bb_n', data: options.folderId || -1 },
                { name: 'size', data: options.size },
                { name: 'name', data: options.name },
                { name: 'upload_file', filename: options.name, data: rn_fetch_blob_1.default.wrap(options.path) },
            ]);
            handle.then(function (value) {
                var _a, _b, _c;
                var response = value.json();
                if (response.zt == 1 && ((_a = response.text) === null || _a === void 0 ? void 0 : _a.length))
                    console.log(response);
                resolve((_c = (_b = response.text) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id);
            });
            event.once('cancel', function () {
                handle.cancel();
                reject();
            });
        });
        promise.cancel = function () { return event.emit('cancel'); };
        return promise;
    };
    return Http;
}(lib_1.HttpBase));
exports.Http = Http;
