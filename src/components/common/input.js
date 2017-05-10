export default class Input {
    constructor(type, value, onInput) {
        this.type = type;
        this.value = value;
        this.onInput = onInput;
        this.input = document.createElement('input');
        this.input.setAttribute('type', this.type);
        this.input.setAttribute('value', value);
        this.input.addEventListener('input', (e) => this.onInput(e));
    }

    render() {
        return this.input;
    }
}