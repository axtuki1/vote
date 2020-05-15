import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class getVoteType extends API{
    public type: string = "get";
    public response = (req, res) => {
        let data = [];
        const settings = DataHolder.getData("settings");
        if( settings.canVote ){
            res.json({
                oneLine: DataHolder.getData("oneLine"),
                data: DataHolder.getData("voteType")
            });
        } else {
            res.json({
                mode: "error",
                text: "現在投票は行われていません。"
            });
        }
    }

}