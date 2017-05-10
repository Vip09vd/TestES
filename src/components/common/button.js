export const UPDATE_BUTTON_EVENT_TYPE = 'update_button';

export default class Button {
    constructor(text, onClick, subscribe) {
        this.action = onClick;
        this.text = text;
        this.button = document.createElement('button');
        this.button.innerText = text;
        this.button.addEventListener('click', onClick);
        if (subscribe) {
            subscribe(UPDATE_BUTTON_EVENT_TYPE, this.update);
        }
    }

    render() {
        return this.button;
    }

    update = (newText) => {
        if (this.text !== newText) {
            this.button.innerText = newText;
        }
    }

}