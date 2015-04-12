'use strict';

var messageList = [];
var nowID;

function createMes(textNew, authorNew) {
    return {
        text: textNew,
        author: authorNew,
        id: uniqueID()
    };
}

function createIdJSON(id_) {
    return {
        id: id_
    }
}

function uniqueID() {
    var date = Date.now();
    var random = Math.random() * Math.random();

    return Math.floor(date * random).toString();
}

var appState = {
    mainUrl : 'http://localhost:6232/chat',
    token : 'TE11EN'
};

function run() {

    var data = restore();
    if (data) {
        messageList = data.messages;
        document.getElementById("name").value = data.lastAuthor;
        writeAll();
    }

    var name = document.getElementById("btnName");
    name.addEventListener("click", function () {
        var name = document.getElementById("inputName").value;
        document.getElementById("inputName").value = '';
        document.getElementById("name").value = name;

        store(messageList);
    });

    var send = document.getElementById("btnSend");
    send.addEventListener("click", function() {
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
        doPost (appState.mainUrl, JSON.stringify(item), function() {
            alert("new message");
        }, null);
        document.getElementById("history").scrollTop = 99999999;
        store(messageList);
    });

    var btn = document.getElementById("btnChangeMessage");
    btn.addEventListener("click", changeMessage, false);

    document.getElementById("history").scrollTop = 99999999;
}

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
}

function funBtnDelete(elem) {
    var parent = elem.parentNode;
    document.getElementById(parent.id).parentNode.removeChild(document.getElementById(parent.id));
    var idJSON = createIdJSON(parent.id);
    doDelete(appState.mainUrl, JSON.stringify(idJSON), function() {
        alert("Deleted");
    }, null);

    for (var i = 0; i < messageList.length; i++) {
        if (messageList[i].id == parent.id) {
            messageList[i] = messageList[messageList.length - 1];
            messageList.pop();
            break;
        }
    }

    store(messageList);
}

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
}

function changeMessage() {
    var text = document.getElementById("inputText");

    doPut(appState.mainUrl,JSON.stringify({id: nowID, text: text.value}), function() {alert('changed');}, null);

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

    store(messageList);
    document.getElementById("history").scrollTop = 99999999;
}

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

function store(item) {
    var storeFile = {
        lastAuthor: document.getElementById("name").value,
        messages: item
    };
    localStorage.setItem("Data of chat", JSON.stringify(storeFile));
}

function restore() {
    if (typeof (Storage) == "undefined") {
        alert("localStorage is not accessible");
        return;
    }

    var item = localStorage.getItem("Data of chat");

    return item && JSON.parse(item);
}

function writeAll() {
    for (var i = 0; i < messageList.length; i++) {
        document.getElementById("history").appendChild(writeUIMessage(messageList[i]));
    }
}

/*function refreshHistory() {
    удаляем всю историю и пишем заново
}
 */

// "начинка" ajax

function defaultErrorHandler(message) {
    console.error(message);
    output(message);
}

function doGet(url, continueWith, continueWithError) {
    ajax('GET', url, null, continueWith, continueWithError);
}

function doPost(url, data, continueWith, continueWithError) {
    ajax('POST', url, data, continueWith, continueWithError);
}

function doPut(url, data, continueWith, continueWithError) {
    ajax('PUT', url, data, continueWith, continueWithError);
}

function doDelete(url, data, continueWith, continueWithError) {
    ajax('DELETE', url, data, continueWith, continueWithError);
    // отправляет запрос OPTIONS ???
}

function isError(text) {
    if(text == "")
        return false;

    try {
        var obj = JSON.parse(text);
    } catch(ex) {
        return true;
    }

    return !!obj.error;
}

function ajax(method, url, data, continueWith, continueWithError) {
    var xhr = new XMLHttpRequest();

    continueWithError = continueWithError || defaultErrorHandler;
    xhr.open(method || 'GET', url, true);

    xhr.onload = function () {
        if (xhr.readyState !== 4)
            return;

        if(xhr.status != 200) {
            continueWithError('Error on the server side, response ' + xhr.status);
            return;
        }

        if(isError(xhr.responseText)) {
            continueWithError('Error on the server side, response ' + xhr.responseText);
            return;
        }

        continueWith(xhr.responseText);
    };

    xhr.ontimeout = function () {
        ontinueWithError('Server timed out !');
    }

    xhr.onerror = function (e) {
        var errMsg = 'Server connection error !\n'+
            '\n' +
            'Check if \n'+
            '- server is active\n'+
            '- server sends header "Access-Control-Allow-Origin:*"';

        continueWithError(errMsg);
    };

    xhr.send(data);
}

window.onerror = function(err) {
    output(err.toString());
}