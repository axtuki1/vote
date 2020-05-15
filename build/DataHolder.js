"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataHolder {
    static getData(key) {
        return this.data[key];
    }
    static setData(key, value) {
        this.data[key] = value;
    }
}
exports.DataHolder = DataHolder;
DataHolder.data = {};
