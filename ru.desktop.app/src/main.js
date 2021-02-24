/****************************************************

        Development by wencms@gmail.com

****************************************************/

function ready() {
    
    document.getElementById("loader").style.display = "none";

}

function loadapps() {

    document.getElementById("apps").innerHTML = "";

    for (var i = 0; i < apps.menu.length; i++) {

        appsd(""+apps.menu[i].app, ""+apps.menu[i].title, ""+apps.menu[i].color);

    }

}

function appsd(app, name, color) {

    document.getElementById("apps").innerHTML += '<layer id="app" onclick="wind(\''+app+'\',\''+name+'\');"><layer id="bg" style="background-color: '+color+';"><layer id="icon" style="background-image: url(apps/'+app+'/res/images/icon.png);"></layer></layer><layer id="name">'+name+'</layer></layer>';

}

function user() {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', '?app=ru.userdata.app', false);

    xhr.send();

    if (xhr.status != 200) {

    } else {
        
        var data = xhr.responseText;

        var dt = data.split("|");

        document.getElementById("name").innerHTML = dt[0];

        document.getElementById("email").innerHTML = dt[1];

        document.getElementById("photo").setAttribute("style","background-image: url("+dt[2]+");");

    }

}


function wind(appd,titled) {

    clsmenu();

    var id = Math.floor(Math.random() * 100) + 1;

    var xhr = new XMLHttpRequest();

    xhr.open('GET', '?app='+appd, false);

    xhr.send();

    if (xhr.status != 200) {

    } else {
        
        var content = xhr.responseText;

    }

    document.getElementById("desktop").innerHTML += '<layer class="window" id="'+id+'"><layer class="head" id="head-'+id+'">'+titled+'</layer><layer class="close" id="close-'+id+'"></layer><layer id="content">'+content+'</layer></layer>';

    document.getElementById("close-"+id).setAttribute("onclick", "windclose('"+id+"');");

    wins(id,"head-"+id);

}

function windclose(win) {
    
    var win = document.getElementById(win);

    win.outerHTML = "";

    delete win;
    
}

function getTime() {

    var date = new Date();

    var hours = date.getHours();

    var minutes = date.getMinutes();

    var day = date.getDate();

    var month = date.getMonth();

    var year = date.getFullYear();

    function hour(hours) {

        if (hours < 10) {

            hours = "0" + hours;

        }

        return hours;

    }

    function minute(minutes) {

        if (minutes < 10) {

            minutes = "0" + minutes;

        }

        return minutes;

    }

    document.getElementById('time').innerHTML = hour(hours) + ":" + minute(minutes);

    document.getElementById('time').setAttribute("title",""+hour(day) + "/" + hour(month) + "/" + year);

}

setInterval(function () {

    getTime();

}, 100);    

function menu() {

    loadapps();

    user();

    document.getElementById("windowmenu").style.display = "block";

    document.getElementById("start").setAttribute("onclick", "clsmenu();");

}

function clsmenu() {

    document.getElementById("windowmenu").style.display = "none";

    document.getElementById("start").setAttribute("onclick", "menu();");

}

var is = 0;

function wins(win, head) {

    is++;

    win = document.getElementById(win);

    head = document.getElementById(head);

    function moveWin(e) {

        win.style.left = e.pageX - win.offsetWidth / 2 + 'px';

        win.style.top = e.pageY - win.offsetHeight / 22 + 'px';

    }

    win.onmousedown = function (e) {

        win.style.position = 'absolute';

        var neid = is + 1;

        win.style.zIndex = neid;

        document.onmousemove = function (e) {

            moveWin(e);
        
        }

        win.onmouseup = function() {
            document.onmousemove = null;
            win.onmouseup = null;
        }

    }

    win.ondragstart = function() {
            
        return false;

    }

}