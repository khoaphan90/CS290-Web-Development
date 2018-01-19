var tableDisplay = function() {
    var body = document.body;

    var currentX = 1;
    var currentY = 1;

    function tableCreate(input) {

        // establish table and body
        var table = document.createElement('table');
        var tableBody = document.createElement('tbody');

        table.style.width = '50%';
        table.setAttribute('border', '1');

        // create rows and cols
        for(var i = 0; i < 4; i++) {
            var row = document.createElement('tr');
            for(var j = 0; j < 4; j++) {
                // create header
                if (i === 0) {
                    var header = document.createElement('th');
                    header.appendChild(document.createTextNode("Header " + (j + 1)));
                    row.appendChild(header);
                }
                // create cell nodes
                else {
                    var cell = document.createElement('td');
                    var info = j+1 + "," + i
                    cell.appendChild(document.createTextNode(info));
                    cell.setAttribute('id', info);
                    if(i === 1 && j === 0) {
                        cell.style.border = "4px solid black";
                    }
                    row.appendChild(cell);
                }
            }
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
        body.appendChild(table);

        if(input){
            input();
        }
    }

    function buttons(input){

        // create buttons and labels
        // possible combine this using a function
        var buttonLeft = document.createElement('button');
        buttonLeft.appendChild(document.createTextNode("Left"));

        var buttonUp = document.createElement('button');
        buttonUp.appendChild(document.createTextNode("Up"));

        var buttonRight = document.createElement('button');
        buttonRight.appendChild(document.createTextNode("Right"));

        var buttonDown = document.createElement('button');
        buttonDown.appendChild(document.createTextNode("Down"));

        var markCell = document.createElement('button');
        markCell.appendChild(document.createTextNode("Mark"));

        // var label = ["Left", "Up", "Right", "Down", "Mark"];
        // for(var i = 0; i < 5; i++){
        //     var button = document.createElement('button');
        //     var attrib = document.createTextNode(label[i])
        //     button.setAttribute('id', attrib);
        //     button.appendChild(attrib);
        //     body.appendChild(button);
        //     console.log(document.getElementById("Right"));
        // }

        body.appendChild(buttonLeft);
        body.appendChild(buttonUp);
        body.appendChild(buttonRight);
        body.appendChild(buttonDown);
        body.appendChild(markCell);

        // add click event on buttons to move or highlight
        // may combine this into a single function
        buttonLeft.addEventListener("click", moveLeft);
        function moveLeft() {

            var currentCell = document.getElementById(currentX + "," + currentY);
            currentCell.style.border = "1px solid black";

            if(currentX !== 1) {
                currentX--;
            }

            var currentCell = document.getElementById(currentX + "," + currentY);
            currentCell.style.border = "3px solid black";
        }

        buttonUp.addEventListener("click", moveUp);
        function moveUp() {

            var currentCell = document.getElementById(currentX + "," + currentY);
            currentCell.style.border = "1px solid black";

            if(currentY !== 1) {
                currentY--;
            }

            var currentCell = document.getElementById(currentX + "," + currentY);
            currentCell.style.border = "3px solid black";
        }

        buttonRight.addEventListener("click", moveRight);
        function moveRight() {

            var currentCell = document.getElementById(currentX + "," + currentY);
            currentCell.style.border = "1px solid black";

            if(currentX !== 4) {
                currentX++;
            }

            var currentCell = document.getElementById(currentX + "," + currentY);
            currentCell.style.border = "3px solid black";
        }

        buttonDown.addEventListener("click", moveDown);
        function moveDown() {

            var currentCell = document.getElementById(currentX + "," + currentY);
            currentCell.style.border = "1px solid black";

            if(currentY !== 3) {
                currentY++;
            }

            var currentCell = document.getElementById(currentX + "," + currentY);
            currentCell.style.border = "3px solid black";
        }

        markCell.addEventListener('click', mark);
        function mark() {
            var cell = document.getElementById(currentX + "," + currentY);
            cell.style.backgroundColor = "yellow";
        }
    }
    tableCreate(buttons);
};

tableDisplay();