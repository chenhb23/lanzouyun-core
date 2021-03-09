"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event() {
        this.listens = {};
    }
    Event.prototype.on = function (event, fn, isOnce) {
        if (isOnce === void 0) { isOnce = false; }
        if (!this.listens[event]) {
            this.listens[event] = [];
        }
        this.listens[event].push({ once: isOnce, fn: fn });
    };
    Event.prototype.once = function (event, fn) {
        this.on(event, fn, true);
    };
    Event.prototype.off = function (event, fn) {
        if (!this.listens[event])
            return;
        if (!fn) {
            this.listens[event] = [];
        }
        else {
            this.listens[event] = this.listens[event].filter(function (value) { return value !== fn; });
        }
    };
    Event.prototype.emit = function (event) {
        var _this = this;
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!((_a = this.listens[event]) === null || _a === void 0 ? void 0 : _a.length))
            return;
        this.listens[event].forEach(function (value) {
            value.fn.apply(value, args);
            if (value.once) {
                _this.off(event, value.fn);
            }
        });
    };
    return Event;
}());
exports.Event = Event;
