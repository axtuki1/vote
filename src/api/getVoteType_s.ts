import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class getVoteType_s extends API{
    public type: string = "get";
    public response = (req, res) => {
        let data = [];
        const settings = DataHolder.getData("settings");
        res.json({
            oneLine: DataHolder.getData("oneLine"),
            data: DataHolder.getData("voteType")
        });
    }

}