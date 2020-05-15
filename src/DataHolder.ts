export class DataHolder{

    private static data = {};

    static getData(key){
        return this.data[key];
    }

    static setData(key, value){
        this.data[key] = value;
    }

}