import { DataHolder } from "./DataHolder";

export abstract class WebSocketAPI{

    clients=DataHolder.getData("wsClients");

    connect(ws, req){
        this.clients.push(ws);
        DataHolder.setData("wsClients", this.clients);
        ws.on('close', ()=>{
            const name=this.clients.find(a=> a===ws).name;
            this.clients=this.clients.filter(a=> a!==ws);
            DataHolder.setData("wsClients", this.clients);
            // this.clients.forEach(a=>{ a.send(JSON.stringify({ user: name, method: 'close', clients: clients.map(a=>name) })); });
        });
        ws.on('message', (msg)=>{
            this.message(ws, req, msg);
        })
    }

    keepAlive(){
        this.clients.forEach(client => {
            client.send(JSON.stringify({
                "mode": "ping",
                "text": "keepAlive"
            }));
        });
    }

    /**
     * WebSocket通信mode
     * @param ws WebSocket
     * @param req  Request
     */
    // abstract connectFunc(ws, req);

    abstract message(ws, req, msg);
};