import './style.css'
import  HTTP  from './components/http';

const usersUrl = 'http://www.mocky.io/v2/58aaea261000003f114b637d';
const persons = [];

HTTP.jsonp(usersUrl).then(function (response) {
    response.forEach(function (user) {
        persons.push(new Person(user));
    });
    window.personsGlobal = persons;
});

class Person{
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

