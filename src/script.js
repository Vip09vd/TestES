const tbody = document.getElementById('users-body');

function getData(arr) {
    let newArr = arr.map(function (person) {
        let name = person.name;
        let userName = person.username;
        let email = person.email;
        let address = person.address;
        let phone = person.phone;
        let website = person.website;
        let row = tbody.insertRow(0);
        let nameTd = row.insertCell(0).innerText = name;
        let userNameTd = row.insertCell(1).innerText = userName;
        let emailTd = row.insertCell(2).innerText = email;
        let addressTd = row.insertCell(3).innerText = `${address.street} ${address.suite} ${address.city} ${address.zipcode}`;
        let phoneTd = row.insertCell(4).innerText = phone;
        let websiteTd = row.insertCell(5).innerText = website;
    });
    console.log(arr);
    console.log(newArr);
}

