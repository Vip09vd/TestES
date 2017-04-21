import './style.css'
// import  HTTP  from './components/http';
//
// const usersUrl = 'http://www.mocky.io/v2/58aaea261000003f114b637d';
// const persons = [];
const root = document.getElementById('root');
//
//
// HTTP.jsonp(usersUrl).then(function (response) {
//     response.forEach(function (user) {
//         let person = new Person(user);
//         persons.push(person);
//         person.render(root);
//     });
//     window.personsGlobal = persons;
// });
//
// class Person {
//     constructor(user) {
//         this.name = user.name;
//         this.id = user.id;
//         this.companyId = user.companyId;
//         this.address = Object.assign({}, user.address);
//         this.username = user.username;
//         this.email = user.email;
//         this.phone = user.phone;
//         this.website = user.website;
//     }
//
//     render(container) {
//         let childContainer = document.createElement('div');
//         for (let prop in this) {
//             if (typeof this[prop] == 'object') {
//                 let result = this.render.call(this[prop], childContainer);
//                 result.className = prop;
//             } else if (prop !== 'id' &&
//                 prop !== 'companyId' &&
//                 prop !== 'company') {
//                 let div = document.createElement('div');
//                 div.innerHTML = prop + ' = ' + this[prop];
//                 childContainer.appendChild(div);
//                 childContainer.className = 'card';
//                 div.className = prop;
//             }
//         }
//         container.appendChild(childContainer);
//         return childContainer;
//     }
// }

class App {
    constructor(component, element) {
        this.component = component;
        this.element = element;
    }

    render() {
        const newChild = this.component.render();
        this.element.innerHTML = '';
        this.element.appendChild(newChild);
    }
}

class Publisher {
    constructor() {
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    publish(data) {
        this.subscribers.forEach(function (subscriber) {
            subscriber(data);
        })
    }
}

class InputWithText extends Publisher {
    constructor() {
        super();
        this.div = document.createElement('div');
        this.value = '';
        this.texts = [];
    }

    handleInput = (event) => {
        this.value = event.target.value;
        this.publish('text_changed', this.value);
    };

    handleSave = () => {
        if (this.value && this.texts.indexOf(this.value) === -1) {
            this.texts.push(this.value);
            this.publish('texts_changed', this.texts);
        }
    };

    render() {
        if (!this.text) {
            this.text = new Text('input');
            this.div.appendChild(this.text.render());
        }

        if (!this.input) {
            this.input = new Input('text', this.handleInput, this.value);
            this.div.appendChild(this.input.render());
        }

        if (!this.saveBtn) {
            this.saveBtn = new Button(this.handleSave);
            this.div.appendChild(this.saveBtn.render());
        }

        if (!this.text2) {
            this.text2 = new Text(this.value);
            this.subscribe('text_changed', this.text2.update.bind(this.text2));
            this.div.appendChild(this.text2.render());
        }

        if (!this.texts) {
            this.texts.forEach(function (text) {
                let paragraph = document.createElement('p');
                paragraph.innerText = text;
                this.div.appendChild(paragraph);
            });
        }

        return this.div;
    }
}

class Text {
    constructor(text) {
        this.text = text;
        this.div = document.createElement('div');
        this.div.innerText = this.text;
    }

    render() {
        return this.div;
    }

    update(newText) {
        if (this.text !== newText) {
            this.text = newText;
            this.div.innerText = this.text;
        }
    }
}

class Button {
    constructor(action) {
        this.action = action;
        this.button = document.createElement('button');
        this.button.innerText = 'SAVE';
        this.button.addEventListener('click', action);
    }

    render() {
        return this.button;
    }

}

class Input {
    constructor(type, onInput, value) {
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

    // update(newType, newOnInput, newValue) {
    //     if (this.type !== newType) {
    //         this.type = newType;
    //         this.input.setAttribute('type', this.type);
    //     }
    //     if (this.value !== newValue) {
    //         this.value = newType;
    //         setTimeout(() => {
    //             this.input.focus();
    //         }, 0);
    //     }
    //     if (this.onInput !== newOnInput) {
    //         this.onInput = newOnInput;
    //     }
    // }
}


const inputWithText = new InputWithText();
const app = new App(inputWithText, root);
app.render();
