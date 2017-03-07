const tbody = document.getElementById('users-body');
const addBtn = document.getElementsByClassName('add')[0];
const createPerson = document.getElementsByClassName('create-person')[0];
const saveBtn = document.getElementsByClassName('save')[0];
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
let cache;
let buttonsTd;
let row;

function newRowRender(data) {
    data.forEach(function (person) {
        let name = person.name;
        let userName = person.username;
        let email = person.email;
        let address = person.address;
        let phone = person.phone;
        let website = person.website;
        row = tbody.insertRow();
        row.id = person.id;
        let nameTd = row.insertCell(0).innerText = name;
        let userNameTd = row.insertCell(1).innerText = userName;
        let emailTd = row.insertCell(2).innerText = email;
        let addressTd = row.insertCell(3).innerText = `${address.street} ${address.suite} ${address.city} ${address.zipcode}`;
        let phoneTd = row.insertCell(4).innerText = phone;
        let websiteTd = row.insertCell(5).innerText = website;
        let buttonDel = document.createElement('button');
        buttonDel.innerText = "Delete";
        buttonDel.classList.add('delete');
        buttonsTd = row.insertCell(6).appendChild(buttonDel);
        buttonDel.addEventListener('click', getDeleteListener(person.id));
    });
}

function getDeleteListener(id) {
    return function removePerson(e) {
        cache.forEach(function (person, i) {
            if(id === person.id) {
                cache.splice(i, 1);
                document.getElementById(id).remove();
                console.log(i);
                return;
            }
        });
    }
}

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
    cache = data;
    newRowRender(cache);
});

function createNewPerson() {
    let newPerson = [{
        id: cache.length + 1,
        name: newName.value,
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
    }];
    cache.push(newPerson[0]);
    newRowRender(newPerson);
    console.log(cache);
}

function getNewValues() {
    createPerson.classList.toggle("hidden");
    saveBtn.classList.toggle("hidden");
    modal.classList.toggle("visible");
    addBtn.innerText = "close";
    (function () {
        addBtn.addEventListener("click", function () {
            if (this.innerText == "edit") {
                addBtn.innerText = "close";
            } else {
                addBtn.innerText = "edit";
            }
        }, false);
    })();
}


