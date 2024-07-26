export class API {
    static init = false;
    static callbacks : Function[] = [];
    static subscribe(){
        return new Promise((resolve) => {
            this.callbacks.push(resolve);
        })
    }
    static update(){
        this.init = true;
        for(let callback of this.callbacks){
            callback();
        }
        this.callbacks = [];
    }
}