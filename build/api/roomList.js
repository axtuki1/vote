"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
class roomList extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "get";
        this.response = (req, res) => {
            let data = {};
            res.json(data);
        };
    }
}
exports.roomList = roomList;
