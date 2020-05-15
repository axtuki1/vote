"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class getVoteSettings extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "get";
        this.response = (req, res) => {
            res.json(DataHolder_1.DataHolder.getData("settings"));
        };
    }
}
exports.getVoteSettings = getVoteSettings;
