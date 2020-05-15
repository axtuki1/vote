import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class postVote extends API{
    public type: string = "post";
    public response = (req, res) => {
        let data = req.body;
        const settings = DataHolder.getData("settings");
        // console.log(settings);
        const voteType = DataHolder.getData("voteType");
        if( voteType[data.type] == null ){
            res.json({
                mode: "error",
                text: "その投票先は存在しません。"
            });
            return;
        }
        let voteData = DataHolder.getData("voteData");
        let votedUser = DataHolder.getData("votedUser");
        if( votedUser.indexOf(req.ip) > -1 ){
            if( !settings.voteChange ){
                res.json({
                    mode: "error",
                    text: "すでに投票しています。"
                });
                return;
            } else {
                Object.keys(voteData).forEach(key => {
                    if(voteData[key].indexOf(req.ip) > -1){
                        delete voteData[key]
                    }
                });
            }
        } else {
            votedUser.push(req.ip);
        }
        DataHolder.setData("votedUser",votedUser);
        if(voteData[data.type] == null) voteData[data.type] = [];
        voteData[data.type].push(req.ip);
        res.json({
            mode: "ok",
            target: data.type
        });
        DataHolder.getData("wsServer").clients.forEach(function(client){
            client.send(JSON.stringify({
                mode: "update-data",
                type: data.type,
                data: voteData
            }));
        });
    }

}