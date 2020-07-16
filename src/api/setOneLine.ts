import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class setOneLine extends API{
    public type: string = "post";
    public response = (req, res) => {
        if(req.body.data.length == 0) req.body.data = ""
        DataHolder.setData("oneLine",req.body.data);
        res.json({
            mode: "ok",
            oneline: DataHolder.getData("oneLine")
        });
        DataHolder.getData("wsClients").clients.forEach(function(client){
            client.send(JSON.stringify({
                mode: "update-oneline",
                oneline: DataHolder.getData("oneLine")
            }));
        });
    }

}