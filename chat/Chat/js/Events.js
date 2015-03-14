'use strict'

var messageList = [];
var nowID;

function createMes(textNew, authorNew) {
    return {
        text: textNew,
        author: authorNew,
        id: uniqueID()
    };
};

function uniqueID() {
    var date = Date.now();
    var random = Math.random() * Math.random();

    return Math.floor(date * random).toString();
};

function visibleButtons() {
    var author = document.getElementById("name").value;
};

function run() {
    var name = document.getElementById("btnName");
    name.addEventListener("click", function () {
        var name = document.getElementById("inputName").value;
        document.getElementById("inputName").value = '';
        document.getElementById("name").value = name;
        visibleButtons();
    });

    var message = document.getElementById("btnSend");
    message.addEventListener("click", function() {
        if (!document.getElementById("inputText").value) {
            return;
        }

        if (!document.getElementById("name").value) {
            alert ("Enter name!");
            return;
        }

        var item = createMes(document.getElementById("inputText").value, document.getElementById("name").value);
        messageList.push(item);
        document.getElementById("inputText").value = '';
        document.getElementById("history").appendChild(writeUIMessage(item));
        document.getElementById("history").scrollTop = 99999999;
    });

    var btn = document.getElementById("btnChangeMessage");
    btn.addEventListener("click", changeMessage, false);
};

function writeUIMessage(elem) {
    var divItem = document.createElement("div");
    divItem.setAttribute("id", elem.id);

    var spanElem = document.createElement("span");
    spanElem.classList.add("author")
    spanElem.textContent = elem.author + ': ';

    var change = document.createElement("i");
    var del = document.createElement("i");
    var btnDel = document.createElement("button");
    var btnChange = document.createElement("button");

    btnDel.classList.add("btn");
    btnDel.classList.add("deleteMessage");
    btnDel.setAttribute("type", "button");

    btnDel.setAttribute("onclick", "funBtnDelete(this)");
    btnDel.classList.add("setInvisible");

    btnChange.classList.add("btn");
    btnChange.classList.add("changeMessage");
    btnChange.setAttribute("type", "button");

    btnChange.setAttribute("onclick", "funBtnChange(this)");
    btnChange.classList.add("setInvisible");

    del.classList.add("glyphicon");
    del.classList.add("glyphicon-remove");
    change.classList.add("glyphicon");
    change.classList.add("glyphicon-cog");

    btnDel.appendChild(del);
    btnChange.appendChild(change);

    var text = document.createElement("pre");
    text.textContent = elem.text;
    text.classList.add("textMessage");

    divItem.appendChild(spanElem);
    divItem.appendChild(btnDel);
    divItem.appendChild(btnChange);
    divItem.appendChild(text);
    divItem.setAttribute("onmouseover", "showButtons(this)");
    divItem.setAttribute("onmouseout", "hideButtons(this)")

    return divItem;
};

function funBtnDelete(elem) {
    var parent = elem.parentNode;
    document.getElementById(parent.id).parentNode.removeChild(document.getElementById(parent.id));

    for (var i = 0; i < messageList.length; i++) {
        if (messageList[i].id == parent.id) {
            messageList[i] = messageList[messageList.length - 1];
            messageList.pop();
            break;
        }
    }
};

function funBtnChange(elem) {
    var item = elem.parentNode;
    var i = 1;
    var mes = item.firstChild;
    while (mes.nodeName == "#text" || !mes.classList.contains("textMessage")) {
        mes = item.childNodes[i++];
    }
    document.getElementById("inputText").value = mes.firstChild.textContent;
    var btn = document.getElementById("btnChangeMessage");
    btn.classList.remove("setInvisible");
    var send = document.getElementById("btnSend");
    send.classList.add("setInvisible");
    nowID = item.id;
};

function changeMessage() {
    var text = document.getElementById("inputText");

    while (!text.value) {
        alert ("Enter some text!");
        return;
    }

    var item = document.getElementById(nowID);
    var i = 1;
    var mes = item.firstChild;
    while (mes.nodeName == "#text" || !mes.classList.contains("textMessage")) {
        mes = item.childNodes[i++];
    }

    mes.innerHTML = text.value;
    var btn = document.getElementById("btnChangeMessage");
    btn.classList.add("setInvisible");
    var send = document.getElementById("btnSend");
    send.classList.remove("setInvisible");

    for (var i = 0; i < messageList.length; i++) {
        if (messageList[i].id == nowID) {
            messageList[i].text = text.value;
            break;
        }
    }
    text.value = '';
};

function showButtons (msg) {
    if (document.getElementById("name").value + ": " == msg.getElementsByClassName("author")[0].innerHTML) {
        msg.getElementsByClassName("deleteMessage")[0].classList.remove("setInvisible");
        msg.getElementsByClassName("changeMessage")[0].classList.remove("setInvisible");
    }
}

function hideButtons (msg) {
    msg.getElementsByClassName("deleteMessage")[0].classList.add("setInvisible");
    msg.getElementsByClassName("changeMessage")[0].classList.add("setInvisible");
}