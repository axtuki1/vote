export abstract class WebSocketAPI{
    /**
     * WebSocket通信mode
     * @param s Server
     * @param ws WebSocket
     * @param data JSONデータ
     * @param id 接続者ID
     */
    abstract message(s, ws, data);
};