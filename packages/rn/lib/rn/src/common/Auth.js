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
var lib_1 = require("../../../core/lib");
var rn_fetch_blob_1 = __importDefault(require("rn-fetch-blob"));
var authFile = '.lanzou_auth';
var tempCookie = 'UM_distinctid=175c95f41fd754-0cc79e716268d2-326f7907-280000-175c95f41fedcb; ylogin=1702063; folder_id_c=-1; phpdisk_info=BzJfagdlAT8OPANlC2IEVwBkBA9ZMQZpV2xQMVdmAzlRZldmDWtRbwE6BF0NY1duBmZWYw9gBzVVYgNkAz0DZQdgX2QHYgFsDjgDYwtoBDgAZwQ0WTgGYFdiUDdXNwNiUTRXZg1oUT4BOwQxDV5XPAZuVmwPZwdnVW4DYAM2AzUHMV9k; CNZZDATA1253610886=257397820-1605400618-https%253A%252F%252Fup.woozooo.com%252F%7C1615186052';
var Auth = /** @class */ (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        var _this = _super.call(this) || this;
        rn_fetch_blob_1.default.fs.readFile(authFile, 'utf8').then(function (value) {
            _this.cookie = value || tempCookie;
        });
        return _this;
    }
    Auth.prototype.login = function (cookie) {
        this.setCookie(cookie);
        return Promise.resolve(cookie);
    };
    Auth.prototype.logout = function () {
        this.removeCookie();
        return Promise.resolve(undefined);
    };
    Auth.prototype.removeCookie = function () {
        this.cookie = '';
        rn_fetch_blob_1.default.fs.unlink(authFile);
    };
    Auth.prototype.setCookie = function (cookie) {
        this.cookie = cookie;
        rn_fetch_blob_1.default.fs.writeFile(authFile, cookie, 'utf8');
        return true;
    };
    return Auth;
}(lib_1.AuthBase));
exports.Auth = Auth;
