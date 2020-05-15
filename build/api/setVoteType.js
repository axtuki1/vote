"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class setVoteType extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "post";
        this.response = (req, res) => {
            if (req.body.data.length == 0)
                req.body.data = [];
            DataHolder_1.DataHolder.setData("voteType", req.body.data);
            res.json(DataHolder_1.DataHolder.getData("voteType"));
            DataHolder_1.DataHolder.getData("wsServer").clients.forEach(function (client) {
                client.send(JSON.stringify({
                    mode: "update-type",
                    type: DataHolder_1.DataHolder.getData("voteType")
                }));
            });
        };
    }
}
exports.setVoteType = setVoteType;
