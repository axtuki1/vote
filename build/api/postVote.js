"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class postVote extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "post";
        this.response = (req, res) => {
            let data = req.body;
            let ip = req.header("X-Real-IP");
            const settings = DataHolder_1.DataHolder.getData("settings");
            // console.log(settings);
            const voteType = DataHolder_1.DataHolder.getData("voteType");
            if (voteType[data.type] == null) {
                res.json({
                    mode: "error",
                    text: "その投票先は存在しません。"
                });
                return;
            }
            let voteData = DataHolder_1.DataHolder.getData("voteData");
            let votedUser = DataHolder_1.DataHolder.getData("votedUser");
            if (votedUser.indexOf(ip) > -1) {
                if (!settings.voteChange) {
                    res.json({
                        mode: "error",
                        text: "すでに投票しています。"
                    });
                    return;
                }
                else {
                    Object.keys(voteData).forEach(key => {
                        if (voteData[key].indexOf(ip) > -1) {
                            voteData[key] = voteData[key].filter(function (a) {
                                return a !== ip;
                            });
                        }
                    });
                }
            }
            else {
                votedUser.push(ip);
            }
            DataHolder_1.DataHolder.setData("votedUser", votedUser);
            if (voteData[data.type] == null)
                voteData[data.type] = [];
            voteData[data.type].push(ip);
            res.json({
                mode: "ok",
                target: data.type
            });
            DataHolder_1.DataHolder.getData("wsClients").clients.forEach(function (client) {
                client.send(JSON.stringify({
                    mode: "update-data",
                    type: data.type,
                    data: voteData
                }));
            });
        };
    }
}
exports.postVote = postVote;
