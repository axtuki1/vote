export abstract class WebSocketAPI{

    clients=[];

    connect(ws, req){
        this.clients.push(ws);
        ws.on('close', ()=>{
            const name=this.clients.find(a=> a===ws).name;
            this.clients=this.clients.filter(a=> a!==ws);
            // this.clients.forEach(a=>{ a.send(JSON.stringify({ user: name, method: 'close', clients: clients.map(a=>name) })); });
        });
        this.connectFunc(ws, req);
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
    abstract connectFunc(ws, req);
};