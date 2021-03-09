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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var lanzou_core_1 = require("lanzou-core");
var fs_1 = __importDefault(require("fs"));
var readline_1 = __importDefault(require("readline"));
var child_process_1 = __importDefault(require("child_process"));
var lzy = 'https://www.lanzou.com';
var authFile = '.lanzou_auth';
function open(url) {
    switch (process.platform) {
        case 'win32':
            return child_process_1.default.exec("start " + url);
        case 'linux':
            return child_process_1.default.exec("xdg-open " + url);
        case 'darwin':
            return child_process_1.default.exec("open " + url);
    }
}
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super.call(this) || this;
        _this.cookie = fs_1.default.existsSync(authFile) ? fs_1.default.readFileSync(authFile).toString() : '';
        return _this;
    }
    Auth.prototype.login = function (cookie) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!cookie) {
                open(lzy);
                console.log('登录后请将 cookie 复制到这里:');
                var rl_1 = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
                rl_1.on('line', function (input) {
                    rl_1.close();
                    if (_this.setCookie(input)) {
                        resolve(input);
                        console.log('登录成功');
                    }
                    else
                        reject();
                });
                rl_1.on('SIGINT', function () {
                    rl_1.close();
                    reject();
                });
            }
            else {
                resolve(cookie);
                console.log('您已登录');
            }
        });
    };
    Auth.prototype.logout = function () {
        this.removeCookie();
        return Promise.resolve(undefined);
    };
    Auth.prototype.removeCookie = function () {
        this.cookie = '';
        if (fs_1.default.existsSync(authFile))
            fs_1.default.unlinkSync(authFile);
        console.log('已登出');
    };
    Auth.prototype.setCookie = function (cookie) {
        if (!cookie)
            return false;
        this.cookie = cookie;
        fs_1.default.writeFileSync(authFile, cookie);
        return true;
    };
    return Auth;
}(lanzou_core_1.AuthBase));
exports.Auth = Auth;
