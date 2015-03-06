function run() {
    var name = document.getElementById("btnName");
    name.addEventListener("click", function () {
        var name = document.getElementById("inputName").value;
        document.getElementById("inputName").value = '';
        document.getElementById("name").innerHTML = name;
    });

    var message = document.getElementById("btnSend");
    message.addEventListener("click", function() {
        var text = document.getElementById("inputText").value;
        document.getElementById("inputText").value = '';
        var item = createMessage(text);
        document.getElementById("toolBar").appendChild(item);
    });
}

function createMessage(mes) {
    if (!mes) {
        return;
    }

    var divItem = document.createElement("div");
    var author = document.createElement("span");

    author.classList.add("author");
    author.innerHTML = document.getElementById("name").value + ': ';
    divItem.classList.add("col-md-12");
    divItem.classList.add("message");
    divItem.appendChild(author);
    divItem.innerHTML += mes;

    return divItem;
}