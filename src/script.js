const tbody = document.getElementById('users-body');
function myCreateFunction() {
    for (let i = 0; i < 10; i++){
        var row = tbody.insertRow(0);
        var cell = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell2.innerText = 'address';
        cell.innerText = name;
        console.log(name);
    }
}

myCreateFunction();


function getData(arr) {
    for (let obj of arr){
        console.log(obj.name);
    }
}

