"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lanzou_core_1 = require("lanzou-core");
var FileSystem_1 = require("./FileSystem");
var Http_1 = require("./Http");
var Path_1 = require("./Path");
var Auth_1 = require("./Auth");
lanzou_core_1.common.set({
    http: new Http_1.Http(),
    fs: new FileSystem_1.FileSystem(),
    path: new Path_1.Path(),
    auth: new Auth_1.Auth(),
});
