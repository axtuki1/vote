import { API } from "./api";
import { DataHolder } from "./DataHolder";
import { WebSocketAPI } from "./ws";
import fetch from 'node-fetch';

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const config = require('config');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || config.serverPort || 3000;
const wsPort = process.env.PORT || config.websocketPort || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('dist'));

app.use("/js/obs", express.static('build/obs'));

const router = express.Router();

const init = () => {
    let d = DataHolder.getData("voteType");
    if( d == null) d = {
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
    DataHolder.setData("voteType",d);

    d = DataHolder.getData("voteData");
    if( d == null) d = {};
    DataHolder.setData("voteData",d);

    d = DataHolder.getData("votedUser");
    if( d == null) d = [];
    DataHolder.setData("votedUser",d);

    d = DataHolder.getData("settings");
    if( d == null) d = {
        voteChange: false, // 投票変更
        canVote: false, // 受付
        viewOBS: false, // OBS表示
        viewData: false, // OBSデータ表示,
    };
    DataHolder.setData("settings",d);

    d = DataHolder.getData("voteTitle");
    if( d == null) d = "どれを選ぶ？";
    DataHolder.setData("voteTitle",d);

    d = DataHolder.getData("oneLine");
    if( d == null) d = 8;
    DataHolder.setData("oneLine",d);

    d = DataHolder.getData("wsClients");
    if( d == null) d = 8;
    DataHolder.setData("wsClients",[]);
}
init();

console.log("Loading webAPI module....");

fs.readdir('./build/api', function(err, files){
    if (err) throw err;    
    files.forEach(element => {
        let name = element.slice(0, -3);
        import('./api/'+name).then((module)=>{
            const api:API = new module[name]();
            console.log("[WEBAPI] "+name+" is loaded. endpoint: /api/v1/"+name);
            let endpoint = "/api/v1/"+name;
            if( api.type == "post" ){
                router.post(endpoint, (req, res)=>{
                    return api.response(req, res);
                });
            } else {
                router.get(endpoint, (req, res)=>{
                    return api.response(req, res);
                });
            }
        }).catch((e)=>{
            console.log("["+name+"] " + e);
        });;
    });
});

app.use(router);

const wsApi:{[key: string]: WebSocketAPI} = {};

console.log("Loading websocket module....");

fs.readdir('./build/wsApi', function(err, files){
    if (err) throw err;    
    files.forEach(element => {
        let name:string = element.slice(0, -3);
        import('./wsApi/'+name).then((module)=>{
            const api:WebSocketAPI = new module[name]();
            wsApi[name] = api;
            app.ws('/'+name, (ws,req)=>{
                api.connect(ws,req);
            });
            console.log("[WSAPI] "+name+" is loaded. ");
        }).catch((e)=>{
            console.log(e);
        });
    });
});


setInterval(()=>{
    Object.keys(wsApi).forEach(key => {
        wsApi[key].keepAlive();
    });
},25*1000);

setTimeout(()=>{
    app.listen(port, function () {
        console.log("listening to PORT: " + port);
        console.log("PORT: " + process.env.PORT);
        console.log("config.port: " + config.serverPort);
    });
}, 500);