import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class setSettings extends API{
    public type: string = "post";
    public response = (req, res) => {
        req.body.data = Object.assign(DataHolder.getData("settings"),req.body.data)
        DataHolder.setData("settings",req.body.data);
        res.json({
            mode: "ok",
            settings: req.body.data
        });
        DataHolder.getData("wsServer").clients.forEach(function(client){
            client.send(JSON.stringify({
                mode: "update-settings",
                settings: req.body.data
            }));
        });
    }

}