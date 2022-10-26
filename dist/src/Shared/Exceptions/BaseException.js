"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
class BaseException extends Error {
    constructor(_message, _data) {
        super();
        this._message = _message;
        this._data = _data;
        Object.setPrototypeOf(this, BaseException.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
    get message() {
        return this._message;
    }
    get data() {
        return this._data;
    }
}
exports.BaseException = BaseException;
//# sourceMappingURL=BaseException.js.map