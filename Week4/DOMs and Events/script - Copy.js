var tableDisplay = function() {

    function tableCreate(cb) {
        var body = document.body;

        // establish table and body
        var table = document.createElement('table');
        var tableBody = document.createElement('tbody');

        table.style.width = '50%';
        table.setAttribute('border', '1');

        // create rows and cols
        for(var i = 0; i < 4; i++) {
            var row = document.createElement('tr');
            for(var j = 0; j < 4; j++) {
                if(i === 4 && j === 4) {
                    break;
                }
                else {
                    // create headers
                    if (i === 0) {
                        var header = document.createElement('th');
                        header.appendChild(document.createTextNode("Header " + (j + 1)));
                        row.appendChild(header); // assigns header to child of row
                    }
                    // create cell nodes
                    else {
                        var cell = document.createElement('td');
                        cell.appendChild(document.createTextNode((j+1) + ", " + i));
                        row.appendChild(cell); // assigns columns and values to row
                        // highlights default cell
                        if (j === 0 && i === 1) {
                            cell.style.border = "2px solid black";
                 }
                    }
                }
            }
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody); // assigns tbody to overall table
        body.appendChild(table); // assigns table as child of body in HTML

        if (cb) {
            cb();
        }
    }

    function markCell(){

    }

    // set starting cell
    var currentX = 1;
    var currentY = 1;

    function traverseTable() {
        var currentCell = currentX + ", " + currentY;
        var currentCell = document.getElementById(currentCell);
        currentCell.stype.border = "2px solid black";
    }

    tableCreate();
};

tableDisplay();