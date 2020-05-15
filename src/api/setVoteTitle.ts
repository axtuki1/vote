import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class setVoteTitle extends API{
    public type: string = "post";
    public response = (req, res) => {
        if(req.body.data.length == 0) req.body.data = ""
        DataHolder.setData("voteTitle",req.body.data);
        res.json({
            mode: "ok",
            title: DataHolder.getData("voteTitle")
        });
        DataHolder.getData("wsServer").clients.forEach(function(client){
            client.send(JSON.stringify({
                mode: "update-title",
                title: DataHolder.getData("voteTitle")
            }));
        });
    }

}