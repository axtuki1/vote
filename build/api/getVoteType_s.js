"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class getVoteType_s extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "get";
        this.response = (req, res) => {
            let data = [];
            const settings = DataHolder_1.DataHolder.getData("settings");
            res.json({
                oneLine: DataHolder_1.DataHolder.getData("oneLine"),
                data: DataHolder_1.DataHolder.getData("voteType")
            });
        };
    }
}
exports.getVoteType_s = getVoteType_s;
