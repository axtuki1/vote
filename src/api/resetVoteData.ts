import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class resetVoteData extends API{
    public type: string = "post";
    public response = (req, res) => {
        DataHolder.setData("voteData",{});
        res.json({
            "mode": "ok"
        });
        DataHolder.getData("wsServer").clients.forEach(function(client){
            client.send(JSON.stringify({
                mode: "update-data",
                data: DataHolder.getData("voteData")
            }));
        });
    }

}