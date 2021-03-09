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
exports.merge = void 0;
// import fs, {WriteStream} from 'fs'
var common_1 = require("../common");
/**
 * @example
 ```
  merge({
    path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7',
    outputPath: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png',
  }).then(console.log)
 ```
 */
function merge(option) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var paths, outputPath, source_1, stat, resolvePath, i, file;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!((_a = option.path) === null || _a === void 0 ? void 0 : _a.length)) {
                        throw new Error('文件路径不能为空');
                    }
                    paths = [];
                    return [4 /*yield*/, common_1.common.path.resolve(option.outputPath)];
                case 1:
                    outputPath = _b.sent();
                    if (!(typeof option.path === 'string')) return [3 /*break*/, 5];
                    return [4 /*yield*/, common_1.common.path.resolve(option.path)];
                case 2:
                    source_1 = _b.sent();
                    return [4 /*yield*/, common_1.common.fs.stat(source_1)];
                case 3:
                    stat = _b.sent();
                    if (stat.isFile)
                        return [2 /*return*/, true]; // 文件无需合并
                    return [4 /*yield*/, common_1.common.fs.readdir(source_1)];
                case 4:
                    paths = (_b.sent()).map(function (value) { return common_1.common.path.join(source_1, value); });
                    if (!paths.length)
                        return [2 /*return*/, false]; // 没有文件可以合并
                    return [3 /*break*/, 6];
                case 5:
                    paths = option.path;
                    _b.label = 6;
                case 6:
                    resolvePath = common_1.common.path.dirname(outputPath);
                    return [4 /*yield*/, common_1.common.fs.exists(resolvePath)];
                case 7:
                    if (!!(_b.sent())) return [3 /*break*/, 9];
                    return [4 /*yield*/, common_1.common.fs.mkdir(resolvePath, { recursive: true })];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9:
                    i = 0;
                    _b.label = 10;
                case 10:
                    if (!(i < paths.length)) return [3 /*break*/, 13];
                    file = paths[i];
                    return [4 /*yield*/, common_1.common.fs.writeFile({
                            source: option.outputPath,
                            target: file,
                            flags: i === 0 ? 'w' : 'a',
                        })
                        // await writeFile(file, ws);
                    ];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 10];
                case 13: return [2 /*return*/, true];
            }
        });
    });
}
exports.merge = merge;
