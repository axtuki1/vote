"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class getVoteType extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "get";
        this.response = (req, res) => {
            let data = [];
            const settings = DataHolder_1.DataHolder.getData("settings");
            if (settings.canVote) {
                res.json({
                    oneLine: DataHolder_1.DataHolder.getData("oneLine"),
                    data: DataHolder_1.DataHolder.getData("voteType")
                });
            }
            else {
                res.json({
                    mode: "error",
                    text: "現在投票は行われていません。"
                });
            }
        };
    }
}
exports.getVoteType = getVoteType;
