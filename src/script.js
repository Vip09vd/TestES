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
    constructor(component, element){
        this.component = component;
        this.element = element;
    }
    render() {
        const newChild = this.component.render();
        this.element.innerHTML = '';
        this.element.appendChild(newChild);
    }
}

class InputWithText {
    constructor() {
        this.div = document.createElement('div');
        this.value = '';
    }

    handleInput = (event) => {
        this.value = event.target.value;
        publisher.publish();
    };

    render() {
        this.div.innerHTML = '';
        const text = new Text('input');
        const input = new Input('text', this.handleInput, this.value);
        const text2 = new Text(this.value);
        this.div.appendChild(text.render());
        this.div.appendChild(input.render());
        this.div.appendChild(text2.render());
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
}

class Input {
    constructor(type, onInput, value) {
        this.type = type;
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

class Publisher {
    constructor() {
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    publish() {
        this.subscribers.forEach(function (subscriber) {
            subscriber();
        })
    }
}

const publisher = new Publisher();
const app = new App(new InputWithText(), root);
app.render();
publisher.subscribe(app.render.bind(app));
