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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
var lanzou_core_1 = require("lanzou-core");
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var os = __importStar(require("os"));
var FileSystem = /** @class */ (function (_super) {
    __extends(FileSystem, _super);
    function FileSystem() {
        var _this = _super.call(this) || this;
        _this.cacheDir = os.tmpdir();
        return _this;
    }
    FileSystem.prototype.exists = function (path) {
        return Promise.resolve(fs_1.default.existsSync(path));
    };
    FileSystem.prototype.mkdir = function (path, option) {
        return new Promise(function (resolve, reject) {
            fs_1.default.mkdir(path, option, function (err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    };
    FileSystem.prototype.rm = function (path) {
        return util_1.promisify(fs_1.default.unlink)(path);
    };
    FileSystem.prototype.stat = function (path) {
        return new Promise(function (resolve, reject) {
            fs_1.default.stat(path, function (err, stats) {
                if (err)
                    reject(err);
                else
                    resolve({
                        isFile: stats.isFile(),
                        isDirectory: stats.isDirectory(),
                        size: stats.size,
                        mtime: stats.mtime,
                    });
            });
        });
    };
    FileSystem.prototype.readdir = function (path) {
        return util_1.promisify(fs_1.default.readdir)(path);
    };
    FileSystem.prototype.writeFile = function (option) {
        return new Promise(function (resolve, reject) {
            var ws = fs_1.default.createWriteStream(option.target, { flags: option.flags || 'w' });
            var rs = fs_1.default.createReadStream(option.source, option.end ? { start: option.start, end: option.end } : undefined);
            ws.on('close', resolve);
            ws.on('error', reject);
            rs.on('error', reject);
            rs.pipe(ws);
        });
    };
    return FileSystem;
}(lanzou_core_1.FileSystemBase));
exports.FileSystem = FileSystem;
