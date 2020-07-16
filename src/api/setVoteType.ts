import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class setVoteType extends API{
    public type: string = "post";
    public response = (req, res) => {
        if(req.body.data.length == 0) req.body.data = []
        DataHolder.setData("voteType",req.body.data);
        res.json(DataHolder.getData("voteType"));
        DataHolder.getData("wsClients").forEach(function(client){
            client.send(JSON.stringify({
                mode: "update-type",
                type: DataHolder.getData("voteType")
            }));
        });
    }

}