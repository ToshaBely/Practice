function run() {
    var count = document.getElementById("history").childElementCount;
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
        var item = createMessage(text, count);
        count++;
        document.getElementById("history").appendChild(item);
    });

    var del = document.getElementById("history");
    del.addEventListener("click", delegateEvent)
    // don`t work--------------------
    /*
    var del = document.getElementsByClassName("deleteMessage");
    del.addEventListener("click", function() {
        alert("it`s work");
        var item = document.getElementById(event.targets.id.value);
        item.deleteContents();
    });*/
    //------------------------
}

function createMessage(mes, count) {
    if (!mes) {
        return;
    }
    if (document.getElementById("name").value == '') {
        alert ("Enter name!");
        return;
    }
    var divItem = document.createElement("div");
    var author = document.createElement("span");
    var text = document.createElement("pre");
    var change = document.createElement("i");
    var del = document.createElement("i");
    var btnDel = document.createElement("button");
    var btnChange = document.createElement("button");

    btnDel.classList.add("btn");
    btnDel.classList.add("deleteMessage");
    btnDel.setAttribute("type", "button");
    btnChange.classList.add("btn");
    btnChange.classList.add("changeMessage");
    btnChange.setAttribute("type", "button");

    del.classList.add("glyphicon");
    del.classList.add("glyphicon-remove");
    change.classList.add("glyphicon");
    change.classList.add("glyphicon-cog");

    btnDel.appendChild(del);
    btnChange.appendChild(change);

    author.classList.add("author");
    author.innerHTML = ' ' + document.getElementById("name").value + ': ';
    divItem.classList.add("col-md-12");
    divItem.classList.add("message");
    divItem.appendChild(author);
    divItem.appendChild(btnDel);
    divItem.appendChild(btnChange);
    text.innerHTML = mes;
    divItem.appendChild(text);
    divItem.id = "message-" + count.toString();

    return divItem;
}