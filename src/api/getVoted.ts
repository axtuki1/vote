import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class getVoted extends API{
    public type: string = "post";
    public response = (req, res) => {
        let data = req.body;
        const voteType = DataHolder.getData("voteType");
        if( voteType[data.type] == null ){
            res.json({
                mode: "error",
                text: "その投票先は存在しません。"
            });
            return;
        }
        let votedUser = DataHolder.getData("votedUser");
        if( votedUser.indexOf(req.ip) > -1 ){
            res.json({
                mode: "ok",
                target: data.type,
                isVoted: true
            });
        } else {
            res.json({
                mode: "ok",
                target: data.type,
                isVoted: false
            });
        }
    }

}