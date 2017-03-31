export default class HTTP {
    
    constructor() {
        throw new Error(`Don't instantiate static class!`);
    }
    
    static jsonp(url) {
        return new Promise(function (resolve) {
            let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            window[callbackName] = function (data) {
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(data);
            };

            let script = document.createElement('script');
            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            document.body.appendChild(script);
        });
    }
} 