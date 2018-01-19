var newTable = document.createElement('table');
var rowInfo = newTable.firstElementChild;

for(var i = 0; i < 4; i++){
    var row = document.createElement('tr');
    newTable.appendChild(row);
}

for(var i = 0; i < 4; i++) {
    if (i === 0) {
        addContent("th", "Header " + (i+1));
    }
    else {
        for(var j = 0; j < 4; j++) {
            var position = (i+1 + ", " + j);
            addContent('td', position);
        }
    }
}

function addContent(cType, cContent){
    var cell = document.createElement(cType);
    cell.textContent = cContent;
    rowInfo.appendChild(cell);
}

newTable.style.border = "3px solid";


document.body.appendChild(newTable);