import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class resetVoteData extends API{
    public type: string = "post";
    public response = (req, res) => {
        DataHolder.setData("voteData",{});
        DataHolder.setData("votedUser", []);
        res.json({
            "mode": "ok"
        });
        DataHolder.getData("wsClients").clients.forEach(function(client){
            client.send(JSON.stringify({
                mode: "update-data",
                data: DataHolder.getData("voteData")
            }));
        });
    }

}