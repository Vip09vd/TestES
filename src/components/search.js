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
