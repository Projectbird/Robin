var frame = document.getElementById("iframe");
var banndedUrls = [];
var passUrls = [];
var historyPoint = 0;

function iframe() {
    frame.width = window.innerWidth;
    frame.height = "100%";
}

function loadLocalStorages() {
    //localStorage.clear();
    var x = 0;
    var k = 0;
    if (typeof(Storage) !== "undefined") {
        $('.settings').each(function(i, e) {
            if (localStorage.getItem(x) !== null) {
                $(e).val(localStorage.getItem(x));
                banndedUrls.push(localStorage.getItem(k));
                k++;
            } else {
                console.log('not set');
            }
            x++;
        });
        if (localStorage.getItem('firstLoad') === null) {
            showPop('about');
        } else {
            removePop('about');
        }
        if (localStorage.getItem('password') !== null) {
            removeElements('#setPasswordButton');
        } else {
            removeElements('#settingsButton');
        }
        if (localStorage.getItem('catch') !== null) {
            setColors();
        }
    }
}

function pageTitle(title) {
    document.title = "Robin : " + title;
}

function showPop(dialog) {
    setLocalStorge('firstLoad', 'true');
    $('#' + dialog + '-dialog').modal('show');
}

function removePop(dialog) {
    $('#' + dialog + '-dialog').modal('hide');
}

function removeElements(element) {
    $(element).remove();
}

function addEventListeners() {
    document.getElementById("back").addEventListener("click", goback);
    document.getElementById("forword").addEventListener("click", goForword);
    document.getElementById("refresh").addEventListener("click", refresh);
    document.getElementById("home").addEventListener("click", goHome);
    document.getElementById("passwordSave").addEventListener("click",
        setPassword, false);
    document.getElementById("passwordTry").addEventListener("click",
        checkSetPassword, false);
    document.getElementById("settingsSave").addEventListener("click",
        saveSettings, false);
    document.getElementById("restart").addEventListener("click", restart,
        false);
    document.getElementById("iframe").addEventListener("load", onSrcChange,
        false);
}

function restart() {
    $('#settings-dialog').modal('hide');
}

function goback() {
    var history = passUrls.length - 2;
    historyPoint = history + 1;
    pastUrl(history);
    //    document.getElementById('iframe').contentWindow.history.go(-1);
}

function pastUrl(history) {
    console.log(history);
    if (history === 0) {
        alert('None' + history);
    } else {
        var lasturl = passUrls[history];
        document.getElementById('iframe').src = lasturl;
    }
}

function goForword() {
    pastUrl(historyPoint);
}

function refresh() {
    console.log('refresh');
    document.getElementById('iframe').src = document.getElementById(
        'iframe').src;
}

function goHome() {
    frame.src = "http://www.bing.com/search?q=meh";
}

function search(event) {
    if (event.keyCode === 13) {
        frame.src = "http://www.bing.com/search?q=" + document.getElementById(
            "searchTerm").value;
        console.log(document.getElementById("searchTerm").value);
        pageTitle(document.getElementById("searchTerm").value);
    }
}

function setPassword() {
    console.log('set password');
    var password = document.getElementById("passwordSet").value;
    if (typeof(Storage) !== "undefined") {
        if (localStorage.password) {
            localStorage.password = password;
        } else {
            localStorage.password = password;
        }
    } else {}
    console.log(localStorage.password);
    $('#password-dialog').modal('hide');
    removeElements();
    loadLocalStorages();
}

function saveSettings() {
    console.log('save settings');
    $('#settings-dialog').modal('hide');
    var x = 0;
    $('.settings').each(function(i, e) {
        setLocalStorge(x, $(e).val());
        x++;
    });
    loadLocalStorages();
}

function setLocalStorge(x, value) {
    // Check browser support
    if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem(x, value);
        console.log(localStorage.getItem(x));
    } else {
        document.getElementById("result").innerHTML =
            "Sorry, your browser does not support Web Storage...";
    }
}

function getLocalStorge(x) {
    return localStorage.getItem(x);
}

function checkSetPassword() {
    var userInput = document.getElementById("password").value;
    if (userInput == localStorage.password) {
        $('#complete-dialog').modal('hide');
        $('#settings-dialog').modal('show');
    } else {
        error();
    }
}

function error() {
    $('.modal').modal('hide');
    $('#error-dialog').modal('show');
}

function setColors() {
    $('div').addClass('navbar-warning').removeClass(
        'navbar-material-light-blue');
}

function urlCleaner(url) {
    for (i = 0; i < banndedUrls.length; i++) {
        if (banndedUrls[i] !== '') {
            var patt = new RegExp(banndedUrls[i]);
            if (patt.test(url)) {
                setColors();
                redirect();
                break;
            } else {}
        }
    }
}

function redirect() {
    localStorage.setItem('catch', 'true');
    document.getElementById('iframe').src = 'http://www.bing.com';
}

function onSrcChange() {
    var url = document.getElementById('iframe').src;
    console.log('src changed ' + document.getElementById('iframe').src);
    urlCleaner(url);
    iframe();
    passUrls.push(url);
}

function alerts(status, message) {
    var div = document.createElement("div");
    var button = document.createElement("button");
    if (status == 'true') {
        div.setAttribute("class", "alert alert-dismissable alert-success");
        div.setAttribute("role", "alert");
        div.setAttribute("id", "alertDiv");
        div.innerHTML = "Awesome, Hold on two seconds " + message;
        button.setAttribute("type", "button");
        button.setAttribute("class", "close");
        button.setAttribute("data-dismiss", "alert");
        button.innerHTML = "x";
        div.appendChild(button);
        document.getElementById("alert").appendChild(div);
        setTimeout(redirect, 2000);
    } else if (status == 'error') {
        div.setAttribute("class", "alert alert-dismissable alert-danger");
        div.setAttribute("role", "alert");
        div.setAttribute("id", "alertDiv");
        button.setAttribute("type", "button");
        button.setAttribute("class", "close");
        button.setAttribute("data-dismiss", "alertDiv");
        button.innerHTML = "x";
        div.appendChild(button);
        div.innerHTML = "Oh snap something is wrong ";
        document.getElementById("alert").appendChild(div);
        setTimeout(removeAlert, 2000);
        $('#complete-dialog').modal('hide');
    } else if (status == 'passwordchanged') {
        div.setAttribute("class", "alert alert-dismissable alert-success");
        div.setAttribute("role", "alert");
        div.setAttribute("id", "alertDiv");
        div.innerHTML = "Password Change Successful";
        button.setAttribute("type", "button");
        button.setAttribute("class", "close");
        button.setAttribute("data-dismiss", "alert");
        button.innerHTML = "x";
        div.appendChild(button);
        document.getElementById("alert").appendChild(div);
    }
}

function removeAlert() {
    $("#alert > div").remove();
}

function init() {
    iframe();
    loadLocalStorages();
    addEventListeners();
}
window.onload = init;