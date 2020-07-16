import { WebSocketAPI } from "../ws";
import { DataHolder } from "../DataHolder";

export class root extends WebSocketAPI{
    connectFunc(ws, req): void {
        ws.on("message", message => {
            const data = JSON.parse(message);
            if( data.mode == null ){
                ws.send(JSON.stringify({
                    mode: "error",
                    reason: "BadRequest"
                }));
                return;
            }
            if( data.mode == "hello" ){
                ws.send(JSON.stringify({
                    mode: "hello",
                    voteType: DataHolder.getData("voteType"),
                    data: DataHolder.getData("voteData"),
                    settings: DataHolder.getData("settings"),
                    title: DataHolder.getData("voteTitle"),
                    oneLine: DataHolder.getData("oneLine")
                }));
            }
        });
    }
    
}