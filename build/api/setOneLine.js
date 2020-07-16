"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class setOneLine extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "post";
        this.response = (req, res) => {
            if (req.body.data.length == 0)
                req.body.data = "";
            DataHolder_1.DataHolder.setData("oneLine", req.body.data);
            res.json({
                mode: "ok",
                oneline: DataHolder_1.DataHolder.getData("oneLine")
            });
            DataHolder_1.DataHolder.getData("wsClients").clients.forEach(function (client) {
                client.send(JSON.stringify({
                    mode: "update-oneline",
                    oneline: DataHolder_1.DataHolder.getData("oneLine")
                }));
            });
        };
    }
}
exports.setOneLine = setOneLine;
