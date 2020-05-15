"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class getVoted extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "post";
        this.response = (req, res) => {
            let data = req.body;
            const voteType = DataHolder_1.DataHolder.getData("voteType");
            if (voteType[data.type] == null) {
                res.json({
                    mode: "error",
                    text: "その投票先は存在しません。"
                });
                return;
            }
            let votedUser = DataHolder_1.DataHolder.getData("votedUser");
            if (votedUser.indexOf(req.ip) > -1) {
                res.json({
                    mode: "ok",
                    target: data.type,
                    isVoted: true
                });
            }
            else {
                res.json({
                    mode: "ok",
                    target: data.type,
                    isVoted: false
                });
            }
        };
    }
}
exports.getVoted = getVoted;
