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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.upload = void 0;
var mkdir_1 = require("./mkdir");
// import config from '../../.lanzou.json'
var config_1 = __importDefault(require("../config"));
var split_1 = require("../util/split");
var ls_1 = require("./ls");
var common_1 = require("../common");
/**
 * 确保目录存在，并返回 folderId
 * 默认查找 -1 的目录
 */
function ensureFolder(option) {
    return __awaiter(this, void 0, void 0, function () {
        var folder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ls_1.lsFolder({ folderId: option.folderId || '-1', limit: 1 })];
                case 1:
                    folder = (_a.sent()).find(function (value) { return value.type === 'directory' && value.name === option.folderName; });
                    return [2 /*return*/, folder ? folder.folderId : mkdir_1.mkdir({ parentId: option.folderId, folderName: option.folderName })];
            }
        });
    });
}
/**
 * 上传文件或文件夹
 */
function upload(option) {
    return __awaiter(this, void 0, void 0, function () {
        var resolvePath, stat, folderId, dirs, stats_1, _i, dirs_1, dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, common_1.common.path.resolve(option.path)];
                case 1:
                    resolvePath = _a.sent();
                    return [4 /*yield*/, common_1.common.fs.stat(resolvePath)];
                case 2:
                    stat = _a.sent();
                    if (!stat.isDirectory) return [3 /*break*/, 10];
                    return [4 /*yield*/, ensureFolder({ folderId: option.folderId, folderName: common_1.common.path.basename(resolvePath) })];
                case 3:
                    folderId = _a.sent();
                    return [4 /*yield*/, common_1.common.fs.readdir(resolvePath)];
                case 4:
                    dirs = (_a.sent()).map(function (value) { return common_1.common.path.join(resolvePath, value); });
                    return [4 /*yield*/, Promise.all(dirs.map(function (value) { return common_1.common.fs.stat(value); }))];
                case 5:
                    stats_1 = _a.sent();
                    dirs = dirs.filter(function (_, index) { var _a; return (_a = stats_1[index]) === null || _a === void 0 ? void 0 : _a.isFile; });
                    _i = 0, dirs_1 = dirs;
                    _a.label = 6;
                case 6:
                    if (!(_i < dirs_1.length)) return [3 /*break*/, 9];
                    dir = dirs_1[_i];
                    return [4 /*yield*/, uploadFile(__assign(__assign({}, option), { folderId: folderId, path: dir }))];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, uploadFile(option)];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.upload = upload;
/**
 * @example
 ```
  login().then(() => {
    uploadFile({path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png'})
  })
 ```
 */
function uploadFile(option) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var resolvePath, stat, name, size, lastModifiedDate, folderId, file, splitData, id_1, total, finished, i, item, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, common_1.common.path.resolve(option.path)];
                case 1:
                    resolvePath = _b.sent();
                    return [4 /*yield*/, common_1.common.fs.stat(resolvePath)];
                case 2:
                    stat = _b.sent();
                    name = common_1.common.path.basename(resolvePath);
                    size = stat.size;
                    lastModifiedDate = stat.mtime;
                    folderId = option.folderId || '-1';
                    file = {
                        type: '',
                        size: size,
                        name: name,
                        lastModifiedDate: lastModifiedDate,
                        folderId: folderId,
                        path: resolvePath,
                        list: [],
                    };
                    return [4 /*yield*/, split_1.split({
                            path: resolvePath,
                            splitSize: config_1.default.splitSize,
                            maxSize: config_1.default.maxSize,
                            // splitSize: '50m',
                            // maxSize: '98m',
                            skipSplit: true,
                        })];
                case 3:
                    splitData = _b.sent();
                    file.list = splitData.files.map(function (value) { return ({
                        lastModifiedDate: value.lastModifiedDate,
                        type: '',
                        folderId: folderId,
                        size: value.size,
                        name: value.name,
                        path: value.sourcePath,
                        startByte: value.startByte,
                        endByte: value.endByte,
                    }); });
                    if (!(file.list.length > 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, ensureFolder({ folderId: folderId, folderName: file.name })];
                case 4:
                    id_1 = _b.sent();
                    file.list = file.list.map(function (value) { return (__assign(__assign({}, value), { folderId: id_1 })); });
                    _b.label = 5;
                case 5:
                    total = file.list.reduce(function (prev, value) { return prev + value.size; }, 0);
                    finished = 0;
                    i = 0;
                    _b.label = 6;
                case 6:
                    if (!(i < file.list.length)) return [3 /*break*/, 9];
                    item = file.list[i];
                    return [4 /*yield*/, common_1.common.http.upload(__assign(__assign({}, (item.endByte ? { end: item.endByte, start: item.startByte } : {})), { folderId: item.folderId, mtime: item.lastModifiedDate, name: item.name, path: item.path, size: item.size }))
                        // const fr = fs.createReadStream(item.path, item.endByte ? {start: item.startByte, end: item.endByte} : undefined)
                        // const form = new FormData()
                        // form.append('task', '1')
                        // form.append('ve', '2')
                        // form.append('lastModifiedDate', item.lastModifiedDate.toString()) // 没有 toString 会报错
                        // form.append('type', item.type || 'application/octet-stream')
                        // form.append('id', `WU_FILE_${i}`)
                        // form.append('folder_id_bb_n', item.folderId || -1)
                        // form.append('size', item.size)
                        // form.append('name', item.name)
                        // form.append('upload_file', fr, item.name)
                        //
                        // const response = await common.http
                        //   .request<LzResponse<UploadRes[]>>({
                        //     url: `https://up.woozooo.com/fileup.php`,
                        //     method: 'post',
                        //     body: form,
                        //     // ...(typeof option.onProgress === 'function'
                        //     //   ? {
                        //     //       onData: bytes => {
                        //     //         option.onProgress({
                        //     //           resolveBytes: finished + bytes,
                        //     //           totalBytes: total,
                        //     //           currentResolveBytes: bytes,
                        //     //           currentTotalBytes: item.size,
                        //     //           name: item.name,
                        //     //           current: i + 1,
                        //     //           length: file.list.length,
                        //     //         })
                        //     //       },
                        //     //     }
                        //     //   : {}),
                        //   })
                        //   .then(value => value.json())
                    ];
                case 7:
                    response = _b.sent();
                    // const fr = fs.createReadStream(item.path, item.endByte ? {start: item.startByte, end: item.endByte} : undefined)
                    // const form = new FormData()
                    // form.append('task', '1')
                    // form.append('ve', '2')
                    // form.append('lastModifiedDate', item.lastModifiedDate.toString()) // 没有 toString 会报错
                    // form.append('type', item.type || 'application/octet-stream')
                    // form.append('id', `WU_FILE_${i}`)
                    // form.append('folder_id_bb_n', item.folderId || -1)
                    // form.append('size', item.size)
                    // form.append('name', item.name)
                    // form.append('upload_file', fr, item.name)
                    //
                    // const response = await common.http
                    //   .request<LzResponse<UploadRes[]>>({
                    //     url: `https://up.woozooo.com/fileup.php`,
                    //     method: 'post',
                    //     body: form,
                    //     // ...(typeof option.onProgress === 'function'
                    //     //   ? {
                    //     //       onData: bytes => {
                    //     //         option.onProgress({
                    //     //           resolveBytes: finished + bytes,
                    //     //           totalBytes: total,
                    //     //           currentResolveBytes: bytes,
                    //     //           currentTotalBytes: item.size,
                    //     //           name: item.name,
                    //     //           current: i + 1,
                    //     //           length: file.list.length,
                    //     //         })
                    //     //       },
                    //     //     }
                    //     //   : {}),
                    //   })
                    //   .then(value => value.json())
                    if (response.zt == 1 && ((_a = response.text) === null || _a === void 0 ? void 0 : _a.length)) {
                        finished += item.size;
                        console.log(response.text.map(function (value) { return "\u4E0A\u4F20\u6210\u529F: " + value.f_id + ", " + value.name_all; }));
                    }
                    _b.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.uploadFile = uploadFile;
