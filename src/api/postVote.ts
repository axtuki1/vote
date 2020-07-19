import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class postVote extends API{
    public type: string = "post";
    public response = (req, res) => {
        // console.log(req);
        let data = req.body;
        let ip = req.ip;
        if( ip == null ){
            ip = req.header("X-Forwarded-For");
        } else if( ip == null ){
            ip = req.header("Cf-Connecting-Ip");
        }
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
        if( votedUser.indexOf(ip) > -1 ){
            if( !settings.voteChange ){
                res.json({
                    mode: "error",
                    text: "すでに投票しています。"
                });
                return;
            } else {
                Object.keys(voteData).forEach(key => {
                    if(voteData[key].indexOf(ip) > -1){
                        voteData[key] = voteData[key].filter(function(a) {
                            return a !== ip;
                        });
                    }
                });
            }
        } else {
            votedUser.push(ip);
        }
        DataHolder.setData("votedUser",votedUser);
        if(voteData[data.type] == null) voteData[data.type] = [];
        voteData[data.type].push(ip);
        res.json({
            mode: "ok",
            target: data.type
        });
        DataHolder.getData("wsClients").forEach(function(client){
            client.send(JSON.stringify({
                mode: "update-data",
                type: data.type,
                data: voteData
            }));
        });
    }

}