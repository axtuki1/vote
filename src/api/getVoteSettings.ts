import { API } from "../api";
import { DataHolder } from "../DataHolder";

export class getVoteSettings extends API{
    public type: string = "get";
    public response = (req, res) => {
        res.json(DataHolder.getData("settings"));
    }

}