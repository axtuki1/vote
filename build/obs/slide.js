"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Library_1 = require("../Library");
$(function () {
    const ws = new WebSocket("ws://192.168.1.88:5001/obsws");
    ws.addEventListener("message", e => {
        const data = JSON.parse(e.data);
        if (data.target == "slide") {
            if (data.mode == "add") {
            }
        }
    });
    ws.addEventListener("open", e => {
        ws.send(JSON.stringify({
            mode: "hello",
            target: "slide"
        }));
    });
    ws.addEventListener("close", e => {
        Library_1.Library.dialog("通信が切断されました。");
    });
});
