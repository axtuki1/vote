import { WebSocketAPI } from "../ws";
import { DataHolder } from "../DataHolder";

export class obsws extends WebSocketAPI {
    message(ws, req, msg): void {
        const data = JSON.parse(msg);
        console.log(data);
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
                voteType: DataHolder.getData("voteType"),
                data: DataHolder.getData("voteData"),
                settings: DataHolder.getData("settings"),
                title: DataHolder.getData("voteTitle"),
                oneLine: DataHolder.getData("oneLine")
            }));
        }
    }

}