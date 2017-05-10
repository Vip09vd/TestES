export default class Publisher {
    constructor() {
        this.subscribers = {};
    }

    subscribe = (type, callback) => {
        if (!this.subscribers[type]) {
            this.subscribers[type] = []
        }
        this.subscribers[type].push(callback);
    };

    publish = (type, data) => {
        if (this.subscribers[type] && this.subscribers[type].length) {
            this.subscribers[type].forEach(function (subscriber) {
                subscriber(data);
            })
        }
    };
}