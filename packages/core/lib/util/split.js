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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeName = exports.encodeIndexName = exports.encodeName = exports.split = void 0;
// import fs from 'fs'
var utils_1 = require("./utils");
// import path from 'path'
// import os from 'os'
// import config from '../../.lanzou.json'
var config_1 = __importDefault(require("../config"));
var common_1 = require("../common");
/**
 * @example
 ```
  split({
    path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png',
    splitSize: '100k',
    maxSize: '100k',
  }).then(value => {
    console.log('finish')
  })
 ```
 */
function split(option) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, resolvePath, fstat, fSize, maxSize, fName, splitData, files, rest, outputPath, _d, _e, splitSize, splitFileNum, i, indexName, writePath, startByte, endByte, file;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = !option.path;
                    if (_c) return [3 /*break*/, 2];
                    return [4 /*yield*/, common_1.common.fs.exists(option.path)];
                case 1:
                    _c = !(_f.sent());
                    _f.label = 2;
                case 2:
                    if (_c) {
                        throw new Error('文件路径为空或不存在');
                    }
                    return [4 /*yield*/, common_1.common.path.resolve(option.path)];
                case 3:
                    resolvePath = _f.sent();
                    return [4 /*yield*/, common_1.common.fs.stat(resolvePath)];
                case 4:
                    fstat = _f.sent();
                    if (!fstat.isFile) {
                        throw new Error('该地址不是文件文件');
                    }
                    fSize = fstat.size;
                    maxSize = utils_1.sizeToByte((_a = option.maxSize) !== null && _a !== void 0 ? _a : config_1.default.maxSize);
                    fName = common_1.common.path.basename(resolvePath);
                    splitData = {
                        path: resolvePath,
                        name: fName,
                        size: fSize,
                        isFile: true,
                        lastModifiedDate: fstat.mtime,
                        files: [],
                    };
                    // 不用分割
                    if (fSize <= maxSize) {
                        files = splitData.files, rest = __rest(splitData, ["files"]);
                        splitData.files = [__assign(__assign({}, rest), { name: encodeName(rest.name), sourcePath: resolvePath })];
                        return [2 /*return*/, splitData];
                    }
                    if (!option.outputPath) return [3 /*break*/, 6];
                    return [4 /*yield*/, common_1.common.fs
                            .exists(option.outputPath)
                            .then(function (value) { return (!value ? option.outputPath : common_1.common.path.resolve(option.outputPath)); })];
                case 5:
                    _d = _f.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _d = common_1.common.path.join(common_1.common.fs.cacheDir, common_1.common.path.basename(option.path, common_1.common.path.extname(option.path)));
                    _f.label = 7;
                case 7:
                    outputPath = _d;
                    splitData.isFile = false;
                    _e = !option.skipSplit;
                    if (!_e) return [3 /*break*/, 9];
                    return [4 /*yield*/, common_1.common.fs.exists(outputPath)];
                case 8:
                    _e = !(_f.sent());
                    _f.label = 9;
                case 9:
                    if (!_e) return [3 /*break*/, 11];
                    return [4 /*yield*/, common_1.common.fs.mkdir(outputPath)];
                case 10:
                    _f.sent();
                    _f.label = 11;
                case 11:
                    splitSize = utils_1.sizeToByte((_b = option.splitSize) !== null && _b !== void 0 ? _b : config_1.default.splitSize);
                    splitFileNum = Math.ceil(fSize / splitSize);
                    for (i = 0; i < splitFileNum; i++) {
                        indexName = encodeIndexName(fName, i) // 分割的文件自动转换拓展名
                        ;
                        writePath = common_1.common.path.join(outputPath, indexName);
                        startByte = splitSize * i;
                        endByte = Math.min(fSize, splitSize * (i + 1) - 1);
                        file = {
                            path: writePath,
                            sourcePath: option.path,
                            size: endByte - startByte,
                            name: indexName,
                            lastModifiedDate: splitData.lastModifiedDate,
                            startByte: startByte,
                            endByte: endByte,
                        };
                        splitData.files.push(file);
                    }
                    if (!!option.skipSplit) return [3 /*break*/, 13];
                    return [4 /*yield*/, Promise.all(splitData.files.map(function (value) {
                            return common_1.common.fs.writeFile({
                                source: value.sourcePath,
                                target: value.path,
                                start: value.startByte,
                                end: value.endByte,
                            });
                        }))];
                case 12:
                    _f.sent();
                    _f.label = 13;
                case 13: return [2 /*return*/, splitData];
            }
        });
    });
}
exports.split = split;
// export interface WriteOption {
//   target: string
//   source: string
//   start: number
//   end: number
// }
// export function writeFile(option: WriteOption) {
//   return new Promise((resolve, reject) => {
//     const rs = fs.createReadStream(option.source, option.end ? {start: option.start, end: option.end} : undefined)
//     const ws = fs.createWriteStream(option.target)
//     ws.on('close', resolve)
//     ws.on('error', reject)
//     rs.on('error', reject)
//     rs.pipe(ws)
//   })
// }
function encodeName(filename) {
    if (!config_1.default.supportExt.includes(common_1.common.path.extname(filename))) {
        return filename + config_1.default.signSuffix;
    }
    return filename;
}
exports.encodeName = encodeName;
/**
 * 如果是支持的后缀，仅添加 index? 其实也是读取不出来的
 */
function encodeIndexName(filename, index) {
    return filename + "." + ("" + index).padStart(3, '0') + config_1.default.signSuffix;
}
exports.encodeIndexName = encodeIndexName;
var reg = new RegExp("(.\\d+)?" + config_1.default.signSuffix + "$");
function decodeName(filename) {
    if (reg.test(filename)) {
        return filename.replace(reg, '');
    }
    return filename;
}
exports.decodeName = decodeName;
