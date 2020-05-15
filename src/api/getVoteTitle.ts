import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class getVoteTitle extends API{
    public type: string = "get";
    public response = (req, res) => {
        res.json({
            mode: "ok",
            title: DataHolder.getData("voteTitle")
        });
    }

}