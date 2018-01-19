function deleteRow(){
    var id = this.id;
    var req = new XMLHttpRequest();
    var mainLink = "http://flip3.engr.oregonstate.edu:8816";
    var combined = mainLink+ "/delete?id="+ id;
    req.open("GET", combined, true);
            req.addEventListener("load", function(){
            if(req.status >= 200 && req.status < 400){
                var node = document.getElementById(id);
                if(node.parentNode){
                    node.parentNode.removeChild(node);
                }
            }
            else{
                console.log("Error in network request");
            }
        });
        req.send(JSON.stringify(req.responseText));
        event.preventDefault();
}