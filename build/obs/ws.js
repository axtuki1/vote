"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Library_1 = require("./Library");
class WebSocketA {
    constructor(url) {
        this.sock = new WebSocket("wss://" + url);
        this.sock.addEventListener("message", e => {
            const data = JSON.parse(e.data);
            if (data.mode == "update") {
            }
        });
        this.sock.addEventListener("open", e => {
        });
        this.sock.addEventListener("close", e => {
            Library_1.Library.dialog("通信が切断されました。");
        });
    }
}
exports.WebSocketA = WebSocketA;
