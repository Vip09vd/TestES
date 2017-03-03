function getData(resp) {
    obj = resp;
    obj.forEach(function (item, i, obj) {
        function createElement() {
            const tbody = document.getElementById('users-body');
            const newRow = document.createElement('tr');
            const newTd = document.createElement('td');
            document.body.insertBefore(newRow, tbody);
            document.body.insertBefore(newTd, newRow);
            newTd.innerText = item[0].name;
        }
        createElement();
    });
};




