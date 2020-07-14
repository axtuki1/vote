"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataHolder_1 = require("./DataHolder");
const express = require('express');
const app = express();
const config = require('config');
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use("/js/obs", express.static('build/obs'));
const router = express.Router();
console.log("Loading webAPI module....");
fs.readdir('./build/api', function (err, files) {
    if (err)
        throw err;
    files.forEach(element => {
        let name = element.slice(0, -3);
        Promise.resolve().then(() => require('./api/' + name)).then((module) => {
            const api = new module[name]();
            console.log("[WEBAPI] " + name + " is loaded. endpoint: /api/v1/" + name);
            let endpoint = "/api/v1/" + name;
            if (api.type == "post") {
                router.post(endpoint, (req, res) => {
                    return api.response(req, res);
                });
            }
            else {
                router.get(endpoint, (req, res) => {
                    return api.response(req, res);
                });
            }
        }).catch((e) => {
            console.log("[" + name + "] " + e);
        });
        ;
    });
});
app.use(router);
app.listen(config.serverPort, function () {
    console.log("listening to PORT: " + config.serverPort);
});
const server = require("ws").Server;
const s = new server({ port: config.websocketPort });
const wsApi = {};
console.log("Loading websocket module....");
fs.readdir('./build/wsApi', function (err, files) {
    if (err)
        throw err;
    files.forEach(element => {
        let name = element.slice(0, -3);
        Promise.resolve().then(() => require('./wsApi/' + name)).then((module) => {
            const api = new module[name]();
            wsApi[name] = api;
            console.log("[WSAPI] " + name + " is loaded. ");
        }).catch((e) => {
            console.log(e);
        });
    });
});
const init = () => {
    let d = DataHolder_1.DataHolder.getData("voteType");
    if (d == null)
        d = {
            "Vote1": {
                "text": "Vote1",
                "color": "#000000",
                "backColor": "#03a5fc"
            },
            "Vote2": {
                "text": "Vote2",
                "color": "#000000",
                "backColor": "#00ff91"
            }
        };
    DataHolder_1.DataHolder.setData("voteType", d);
    d = DataHolder_1.DataHolder.getData("voteData");
    if (d == null)
        d = {};
    DataHolder_1.DataHolder.setData("voteData", d);
    d = DataHolder_1.DataHolder.getData("votedUser");
    if (d == null)
        d = [];
    DataHolder_1.DataHolder.setData("votedUser", d);
    d = DataHolder_1.DataHolder.getData("settings");
    if (d == null)
        d = {
            voteChange: false,
            canVote: false,
            viewOBS: false,
            viewData: false,
        };
    DataHolder_1.DataHolder.setData("settings", d);
    d = DataHolder_1.DataHolder.getData("voteTitle");
    if (d == null)
        d = "どれを選ぶ？";
    DataHolder_1.DataHolder.setData("voteTitle", d);
    d = DataHolder_1.DataHolder.getData("oneLine");
    if (d == null)
        d = 8;
    DataHolder_1.DataHolder.setData("oneLine", d);
};
init();
setInterval(() => {
    s.clients.forEach(client => {
        client.send(JSON.stringify({
            "mode": "ping",
            "text": "keepAlive"
        }));
    });
}, 25 * 1000);
DataHolder_1.DataHolder.setData("wsServer", s);
s.on("connection", ws => {
    init();
    ws.on("message", message => {
        const data = JSON.parse(message);
        if (data.mode == null) {
            ws.send(JSON.stringify({
                mode: "error",
                reason: "BadRequest"
            }));
            return;
        }
        if (data.mode == "hello") {
            ws.send(JSON.stringify({
                mode: "hello",
                voteType: DataHolder_1.DataHolder.getData("voteType"),
                data: DataHolder_1.DataHolder.getData("voteData"),
                settings: DataHolder_1.DataHolder.getData("settings"),
                title: DataHolder_1.DataHolder.getData("voteTitle"),
                oneLine: DataHolder_1.DataHolder.getData("oneLine")
            }));
        }
    });
});
