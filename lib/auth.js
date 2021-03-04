"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.setCookie = exports.login = exports.cookie = void 0;
var child_process_1 = __importDefault(require("child_process"));
var readline_1 = __importDefault(require("readline"));
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var lzy = 'https://www.lanzou.com';
var authFile = path_1.default.resolve(os_1.default.homedir(), '.lanzou_auth');
exports.cookie = fs_1.default.existsSync(authFile) ? fs_1.default.readFileSync(authFile).toString() : '';
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
/**
 * 返回 cookie
 */
function login() {
    return new Promise(function (resolve, reject) {
        if (!exports.cookie) {
            open(lzy);
            console.log('登录后请将 cookie 复制到这里:');
            var rl_1 = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
            rl_1.on('line', function (input) {
                rl_1.close();
                if (setCookie(input)) {
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
            resolve(exports.cookie);
            console.log('您已登录');
        }
    });
}
exports.login = login;
function setCookie(value) {
    if (!value) {
        console.log('cookie 为空！');
        return false;
    }
    exports.cookie = value;
    fs_1.default.writeFileSync(path_1.default.resolve(os_1.default.homedir(), '.lanzou_auth'), value);
    console.log('cookie 设置完成');
    return true;
}
exports.setCookie = setCookie;
function logout() {
    exports.cookie = '';
    if (fs_1.default.existsSync(authFile))
        fs_1.default.unlinkSync(authFile);
    console.log('已登出');
}
exports.logout = logout;
