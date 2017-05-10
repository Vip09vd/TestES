import './style.css'
import  HTTP  from './components/http';
import Publisher from "./common/publisher";
// import List from "./components/common/list";
import Text from "./components/common/text";
import Cards from "./components/common/card";
const usersUrl = 'http://www.mocky.io/v2/58aaea261000003f114b637d';
const root = document.getElementById('root');


class Person {
    constructor(user) {
        this.name = user.name;
        this.id = user.id;
        this.companyId = user.companyId;
        this.address = Object.assign({}, user.address);
        this.username = user.username;
        this.email = user.email;
        this.phone = user.phone;
        this.website = user.website;
    }
}

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

class Main extends Publisher {
    constructor() {
        super();
        this.persons = [];
        this.div = document.createElement('div');
        HTTP.jsonp(usersUrl).then((response) => {
            const newPersons = response.map((user) => new Person(user));
            this.update(newPersons);
        });
    }

    render() {
        this.cardContainer = new Cards(this.persons.map(function (person) {
            return new Text(person.name);
        }));
        const renderedList = this.cardContainer.render();
        this.div.appendChild(renderedList);
        return this.div;
    }

    update = (newList) => {
        if (this.persons !== newList) {
            this.persons = newList;
            this.render();
        }
    }
}


const app = new App(new Main(), root);
app.render();


// class InputWithText extends Publisher {
//     constructor() {
//         super();
//         this.div = document.createElement('div');
//         this.value = '';
//         this.items = [];
//     }
//
//     handleInput = (event) => {
//         this.value = event.target.value;
//         this.publish('text_changed', this.value);
//     };
//
//     handleSave = () => {
//         if (this.value && this.items.indexOf(this.value) === -1) {
//             this.items = this.items.slice();
//             this.items.push(this.value);
//             this.publish('texts_changed', this.items);
//         }
//         console.log(this.items);
//     };
//
//     render() {
//         if (!this.text) {
//             this.text = new Text('input');
//             this.div.appendChild(this.text.render());
//         }
//
//         if (!this.input) {
//             this.input = new Input('text', this.handleInput, this.value);
//             this.div.appendChild(this.input.render());
//         }
//
//         if (!this.saveBtn) {
//             this.saveBtn = new Button(this.handleSave);
//             this.div.appendChild(this.saveBtn.render());
//         }
//
//         if (!this.text2) {
//             this.text2 = new Text(this.value, this.subscribe);
//             this.div.appendChild(this.text2.render());
//         }
//
//         if (!this.savedList) {
//             this.savedList = new SavedList(this.items, this.subscribe);
//             this.div.appendChild(this.savedList.render());
//         }
//
//         return this.div;
//     }
// }

//
//
// const inputWithText = new InputWithText();
// const app = new App(inputWithText, root);
// app.render();
