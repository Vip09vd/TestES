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
    static render(component, element) {
        element.innerHTML = component.render();
    }
}

class InputWithText {
    constructor(){

    }

    handleInput(e) {
        const value = e.target.value;
        console.log(value);
    }

    render() {
        const text = new Text('input');
        const input = new Input('text', this.handleInput);
        const text2 = new Text('lll');
        return `<div>
            ${text.render()}
            ${input.render()}
            ${text2.render()}
         </div>`
    }
}

class Text {
    constructor(text){
        this.text = text;
    }
    render() {
        return `<div>${this.text}</div>`;
    }
}

class Input {
    constructor(type, onInput) {
        this.type = type;
        this.onInput = onInput;
    }
    render() {
        return `<input oninput="${this.onInput()}" type="${this.type}"/>`;
    }
}

App.render(new InputWithText(), root);
