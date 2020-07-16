"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class resetVoteData extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "post";
        this.response = (req, res) => {
            DataHolder_1.DataHolder.setData("voteData", {});
            DataHolder_1.DataHolder.setData("votedUser", []);
            res.json({
                "mode": "ok"
            });
            DataHolder_1.DataHolder.getData("wsClients").clients.forEach(function (client) {
                client.send(JSON.stringify({
                    mode: "update-data",
                    data: DataHolder_1.DataHolder.getData("voteData")
                }));
            });
        };
    }
}
exports.resetVoteData = resetVoteData;
