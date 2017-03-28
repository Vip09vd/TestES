const tbody = document.getElementById('users-body');
const addBtn = document.getElementsByClassName('add')[0];
const createPerson = document.getElementsByClassName('create-person')[0];
const saveBtn = document.getElementsByClassName('save')[0];
const editBtn = document.getElementsByClassName('edit')[0];
const modal = document.getElementsByClassName('modal')[0];
let newName = document.getElementsByClassName('name-field')[0];
let newUserName = document.getElementsByClassName('username-field')[0];
let newEmail = document.getElementsByClassName('email-field')[0];
let newPhone = document.getElementsByClassName('phone-field')[0];
let newStreet = document.getElementsByClassName('street-field')[0];
let newSuite = document.getElementsByClassName('suite-field')[0];
let newCity = document.getElementsByClassName('city-field')[0];
let newZipcode = document.getElementsByClassName('zipcode-field')[0];
let newWebsite = document.getElementsByClassName('site-field')[0];
newName.addEventListener('change', getValueListener(newName));
newUserName.addEventListener('change', getValueListener(newUserName));
newEmail.addEventListener('change', getValueListener(newEmail));
let cache;
let buttonsTd;
let row;
let edit;
let emailTd;
let maxId = 0;
let takenEmail = document.createElement('input');
document.body.appendChild(takenEmail);
takenEmail.style.opacity = 0;
takenEmail.style.width = '20px';

function jsonp(url, callback) {
    let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    let script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

jsonp('http://www.mocky.io/v2/58aaea261000003f114b637d', function (data) {
    cache = data.map(function (user) {
        return new Person(user);
    });
    cache.sort(sortBy('name'));
    newRowRender(cache);
});

function newRowRender(data) {
    data.forEach(function (person) {
        if (person.id > maxId) {
            maxId = person.id;
        }
        row = tbody.insertRow();
        fillRow(person, row);
    });
}

function clear() {
    let row = document.getElementsByTagName('tr');
    for (let i = row.length - 1; i > 0; i--) {
        console.log(row.length);
        row[i].remove();
    }
}


function handleSearch() {
    let search, filter, row, td, i;
    search = document.getElementsByClassName('search')[0];
    filter = search.value.toLowerCase();
    row = tbody.getElementsByTagName('tr');
    console.log(row);

    for (i = 0; i < row.length; i++) {
        td = [].slice.call(row[i].getElementsByTagName('td'));
        console.log(td);
        if ((td[0].innerText + td[1].innerText + td[2].innerText).toLowerCase().indexOf(filter) > -1) {
            row[i].style.display = '';
        } else {
            row[i].style.display = 'none';
        }
    }
}

function fillRow(person, row) {
    let name = person.name;
    let userName = person.username;
    let email = person.email;
    let address = person.address;
    let phone = person.phone;
    let website = person.website;
    row.id = person.id;
    let nameTd = row.insertCell(0).innerText = name;
    let userNameTd = row.insertCell(1).innerText = userName;
    emailTd = row.insertCell(2);
    emailTd.innerText = email;
    let addressTd = row.insertCell(3).innerText = `${address.street} ${address.suite} ${address.city} ${address.zipcode}`;
    let phoneTd = row.insertCell(4).innerText = phone;
    let websiteTd = row.insertCell(5).innerText = website;
    let buttonDel = document.createElement('button');
    let buttonEdit = document.createElement('button');
    let buttonCopy = document.createElement('button');
    buttonCopy.innerText = '✂';
    buttonCopy.classList.add('copy');
    emailTd.appendChild(buttonCopy);
    buttonDel.innerText = "Delete";
    buttonEdit.innerText = "Edit";
    buttonDel.classList.add('delete', 'danger');
    buttonEdit.classList.add('edit', 'primary');
    buttonsTd = row.insertCell(6);
    buttonsTd.appendChild(buttonEdit);
    buttonsTd.appendChild(buttonDel);
    buttonDel.addEventListener('click', getDeleteListener(person.id, cache));
    buttonEdit.addEventListener('click', getEditListener(person.id));
    buttonCopy.addEventListener('click', getCopyListener(person.email));
}

function getDeleteListener(id, array) {
    return function removePerson() {
        array.forEach(function (person, i) {
            if (id === person.id) {
                cache.splice(i, 1);
                document.getElementById(id).remove();
                console.log(i);
                return;
            }
        });
    }
}


function getCopyListener(email) {
    return function copyEmail() {
        takenEmail.value = email;
        takenEmail.select();
        document.execCommand('copy');
    }
}


function sortBy(prop) {
    return function (a, b) {
        if (prop === 'street') {
            let s1 = a.address[prop].toLowerCase();
            let s2 = b.address[prop].toLowerCase();
            return ((s1 === s2) ? 0 : (s1 > s2) ? 1 : -1);
        } else {
            let s1 = a[prop].toLowerCase();
            let s2 = b[prop].toLowerCase();
            return ((s1 === s2) ? 0 : (s1 > s2) ? 1 : -1);
        }
    }
}


let reverse = false;

function sortOnClick(prop) {
    cache.sort(sortBy(prop));
    if (reverse = !reverse) {
        cache.reverse();
    }
    clear();
    newRowRender(cache);
}

function getValueListener(input) {
    return function nameValue() {
        let errorMsg = input.previousElementSibling;
        console.log(errorMsg);
        let errorLabel = errorMsg.innerText;
        if (input.validationMessage == '') {
            errorMsg.innerText = errorLabel;
        } else {
            errorMsg.innerText = input.validationMessage;
            errorMsg.style.fontSize = '11px';
            errorMsg.style.color = 'red';
        }
    }
}

function getNewValues() {
    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
    modal.classList.toggle("visible");
    (function () {
        createPerson.reset();
    })();
}

function editValues() {
    saveBtn.classList.add("hidden");
    editBtn.classList.remove("hidden");
    modal.classList.toggle("visible");
}

function closeModal() {
    modal.classList.remove("visible");
}

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

    static save() {
        const newUser = {
            name: newName.value,
            id: maxId + 1,
            companyId: '',
            address: {
                street: newStreet.value,
                suite: newSuite.value,
                city: newCity.value,
                zipcode: newZipcode.value
            },
            username: newUserName.value,
            email: newEmail.value,
            phone: newPhone.value,
            website: newWebsite.value
        };
        const newPerson = new Person(newUser);
        newPerson.validate();
        clear();
        newRowRender(cache);
    }

    edit() {
        this.name = newName.value;
        this.companyId = '';
        this.address = {
            street: newStreet.value,
            suite: newSuite.value,
            city: newCity.value,
            zipcode: newZipcode.value
        };
        this.username = newUserName.value;
        this.email = newEmail.value;
        this.phone = newPhone.value;
        this.website = newWebsite.value;

        let row = document.getElementById(this.id);
        let newRow = document.createElement('tr');
        tbody.insertBefore(newRow, row);
        fillRow(this, newRow);
        row.remove();
    }

    validate() {
        if (newName.validity.valueMissing ||
            newUserName.validity.valueMissing ||
            newPhone.validity.typeMismatch ||
            newEmail.validity.valid === false) {
            return false;
        } else {
            for (let i = 0; i < cache.length; i++) {
                if (cache[i].username === this.username ||
                    cache[i].email === this.email) {
                    return false;
                }
            }
            cache.push(this);
            cache.sort(sortBy('name'));
            createPerson.reset();
            return true;
        }
    }
}

function getEditListener(id) {
    return function editPerson() {
        cache.forEach(function (person) {
            if (id === person.id) {
                editValues();
                newName.value = person.name;
                newStreet.value = person.address.street;
                newSuite.value = person.address.suite;
                newCity.value = person.address.city;
                newZipcode.value = person.address.zipcode;
                newUserName.value = person.username;
                newEmail.value = person.email;
                newPhone.value = person.phone;
                newWebsite.value = person.website;
                id = person.id;
                edit = person.edit.bind(person);
            }
        })
    }
}


