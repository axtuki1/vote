"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataHolder_1 = require("./DataHolder");
class WebSocketAPI {
    constructor() {
        this.clients = DataHolder_1.DataHolder.getData("wsClients");
    }
    connect(ws, req) {
        this.clients.push(ws);
        DataHolder_1.DataHolder.setData("wsClients", this.clients);
        ws.on('close', () => {
            const name = this.clients.find(a => a === ws).name;
            this.clients = this.clients.filter(a => a !== ws);
            DataHolder_1.DataHolder.setData("wsClients", this.clients);
            // this.clients.forEach(a=>{ a.send(JSON.stringify({ user: name, method: 'close', clients: clients.map(a=>name) })); });
        });
        console.log("c");
        ws.on('message', (msg) => {
            console.log("msg");
            this.message(ws, req, msg);
        });
    }
    keepAlive() {
        this.clients.forEach(client => {
            client.send(JSON.stringify({
                "mode": "ping",
                "text": "keepAlive"
            }));
        });
    }
}
exports.WebSocketAPI = WebSocketAPI;
;
