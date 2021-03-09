"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.Path = exports.Http = exports.FileSystem = void 0;
var lib_1 = require("../../../core/lib");
var FileSystem_1 = require("./FileSystem");
var Http_1 = require("./Http");
var Path_1 = require("./Path");
var Auth_1 = require("./Auth");
lib_1.common.set({
    http: new Http_1.Http(),
    fs: new FileSystem_1.FileSystem(),
    path: new Path_1.Path(),
    auth: new Auth_1.Auth(),
});
__exportStar(require("../../../core/lib"), exports);
var FileSystem_2 = require("./FileSystem");
Object.defineProperty(exports, "FileSystem", { enumerable: true, get: function () { return FileSystem_2.FileSystem; } });
var Http_2 = require("./Http");
Object.defineProperty(exports, "Http", { enumerable: true, get: function () { return Http_2.Http; } });
var Path_2 = require("./Path");
Object.defineProperty(exports, "Path", { enumerable: true, get: function () { return Path_2.Path; } });
var Auth_2 = require("./Auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return Auth_2.Auth; } });
