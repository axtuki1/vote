import { Express } from 'express';

export abstract class API {
    public abstract type:string;
    public abstract response(req, res);
}