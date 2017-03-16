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
let takenEmail = document.createElement('input');
document.body.appendChild(takenEmail);
takenEmail.style.opacity = 0;
takenEmail.style.width = '1px';


function newRowRender(data) {
    data.forEach(function (person) {
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


function getEditListener(id) {
    return function editPerson() {
        cache.forEach(function (person, i) {
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
                edit = function EditedValues() {
                    let editedPerson = cache[i] = {
                        name: newName.value,
                        id: person.id,
                        companyId: person.companyId,
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
                    let row = document.getElementById(id);
                    let newRow = document.createElement('tr');
                    tbody.insertBefore(newRow, row);
                    fillRow(editedPerson, newRow);
                    row.remove();
                };
            }
        })
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
    cache.sort(sortBy('name'));
    newRowRender(cache);
});


function createNewPerson() {
    let newId = cache[cache.length - 1].id + 1;
    let newPerson = {
        id: newId,
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
    };
    validate(newPerson);
    console.log(cache);
    clear();
    newRowRender(cache);
}

function sortBy(prop) {
    return function (a, b) {
        return ((a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0);
    }
}


function validate(person) {
    if (newName.validity.valueMissing ||
        newUserName.validity.valueMissing ||
        newPhone.validity.typeMismatch ||
        newEmail.validity.valid === false) {
        return false;
    } else {
        for (let i = 0; i < cache.length; i++) {
            if (cache[i].username === newUserName.value ||
                cache[i].email === newEmail.value) {
                return false;
            }
        }
        cache.push(person);
        cache.sort(sortBy('name'));
        return true;
    }
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





