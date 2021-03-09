"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathBase = void 0;
/**
 * path need full path
 */
var PathBase = /** @class */ (function () {
    function PathBase() {
    }
    PathBase.prototype.join = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return paths.map(function (value, index) { return (index === 0 ? value : value.replace(/^\.\//, '')); }).join(this.sep);
    };
    PathBase.prototype.basename = function (p, ext) {
        var arr = p.split(this.sep);
        var name = arr[arr.length - 1];
        return ext ? name.replace(new RegExp(ext + "$"), '') : name;
    };
    PathBase.prototype.dirname = function (p) {
        var index = p.lastIndexOf(this.sep);
        if (index < 0)
            return '.';
        return p.slice(0, index);
    };
    PathBase.prototype.extname = function (p) {
        if (!/\.\w+$/.test(p))
            return '';
        var arr = p.split('.');
        return arr[arr.length - 1];
    };
    return PathBase;
}());
exports.PathBase = PathBase;
