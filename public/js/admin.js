// Search Box
function searchBox() {
    var input, filter, table, tr, td, cell, i, j;
    filter = document.getElementById("searchInput").value.toLowerCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        const tdArray = tr[i].getElementsByTagName("td");
        for (var j = 0; j < tdArray.length; j++) {
            const cellValue = tdArray[j];
            if (cellValue && cellValue.innerHTML.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
            }
        }
    }
}

// Sort column
cPrev = -1;
function sortBy(c) {
    rows = document.getElementById("myTable").rows.length;
    columns = document.getElementById("myTable").rows[0].cells.length;
    arrTable = [...Array(rows)].map(e => Array(columns));

    for (ro = 0; ro < rows; ro++) {
        for (co = 0; co < columns; co++) {
            arrTable[ro][co] = document.getElementById("myTable").rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift();

    if (c !== cPrev) {
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else {
        arrTable.reverse();
    }

    cPrev = c;

    arrTable.unshift(th);

    for (ro = 0; ro < rows; ro++) {
        for (co = 0; co < columns; co++) {
            document.getElementById("myTable").rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}
