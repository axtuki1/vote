"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api");
const DataHolder_1 = require("../DataHolder");
class setSettings extends api_1.API {
    constructor() {
        super(...arguments);
        this.type = "post";
        this.response = (req, res) => {
            req.body.data = Object.assign(DataHolder_1.DataHolder.getData("settings"), req.body.data);
            DataHolder_1.DataHolder.setData("settings", req.body.data);
            res.json({
                mode: "ok",
                settings: req.body.data
            });
            DataHolder_1.DataHolder.getData("wsClients").forEach(function (client) {
                client.send(JSON.stringify({
                    mode: "update-settings",
                    settings: req.body.data
                }));
            });
        };
    }
}
exports.setSettings = setSettings;
