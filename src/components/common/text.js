export const UPDATE_TEXT_EVENT_TYPE = 'update_text';
export default class Text {
    constructor(text, subscribe) {
        this.text = text;
        this.p = document.createElement('p');
        this.p.innerText = this.text;
        if (subscribe) {
            subscribe(UPDATE_TEXT_EVENT_TYPE, this.update);
        }
    }

    render() {
        return this.p;
    }

    update = (newText) => {
        if (this.text !== newText) {
            this.text = newText;
            this.p.innerText = this.text;
        }
    }
}
