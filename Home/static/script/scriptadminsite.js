addTaskPlace = document.getElementById("addTask");
addTaskPlace.addEventListener("click", CreatTask);

function CreatTask() {
    blurModal = document.getElementsByClassName("modal visible loaded")[0];
    blurModal.style.zIndex = "10";
    blurModal.className += " w3-opacity-max" + " w3-black";

    addTaskCol = document.getElementById("addTaskCol");
    addTaskCol.hidden = true;


    CreateTaskForm = document.getElementById("CreateTaskForm");
    CreateTaskForm.removeAttribute("hidden");
}

function QuitForm(idtag) {
    blurModal = document.getElementsByClassName("modal visible loaded")[0];
    blurModal.style.zIndex = "-1";
    blurModal.className = blurModal.className.replace(" w3-opacity-max", "");
    blurModal.className = blurModal.className.replace(" w3-black", "");
    $('#input-file').val('');
    fileList = {
        files: []
    }
    addTaskCol.hidden = false;

    var $me = $(".calendar"),
        $parent = $me.parents('.date-picker');
    $parent.find('.result').children('span').html('');

    var listfile = $('.btcd-files');
    listfile.empty();
    $('.btcd-f-title').html('No File Chosen');
    $('.f-max').html('(Max 100 MB)');

    CreateTaskForm = document.getElementById(idtag);
    CreateTaskForm.hidden = true;
    document.getElementById('content').value = "";
    document.getElementById('title').value = "";

}

$('#alltask').click(function () {
    element = document.getElementById('alltask');
    if (element.classList.contains('w3-yellow') == true) {
        return

    } else {
        $("#alltask").addClass("w3-bar-item w3-button w3-yellow w3-hover-yellow");
        $("#progress").attr('class', '');
        $("#completed").attr('class', '');

        $("#progress").addClass('w3-bar-item w3-button w3-hover-yellow');
        $("#completed").addClass('w3-bar-item w3-button w3-hover-yellow');
        var list_task = document.getElementsByClassName('task');
        while (list_task.length > 0) {
            list_task[0].parentNode.removeChild(list_task[0]);
        }
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/getadmin/",
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
                var data = JSON.parse(JSON.stringify(response));
                for (id = 0; id < data.length; id++) {
                    if (data[id].task_status == 0) {
                        var deadline = data[id].deadline.slice(0, 10);
                        deadline = getFormattedDate(deadline);
                        var task = `<div class="w3-card w3-white w3-round w3-margin-left w3-margin task" id="${data[id].id_task}">
                            <div class="w3-row">
                            <div class="w3-col" style="width: 15px;margin-left: 10px;margin-right:5px;padding-top:13px;">
                                <input type="checkbox" id="${data[id].id_check}" onchange="CheckTask(${data[id].id_task})">
                            </div>
                            <div class="w3-col" style="width: calc(100% - 30px);">
                                <button onclick="showtask('${data[id].id_content}');" type="button" class="w3-button w3-block w3-left-align" style="padding-left:31px;font-size: 20px;">
                                <span class="unfinish" id="${data[id].id_title}">${data[id].title}</span>
                                <span class="w3-right w3-opacity" style="font-size:13px;">${data[id].author}</span>
                                <br>
                                <span class="w3-opacity" id="${data[id].id_deadline}" style="font-size: 13px;"> Đến hạn: ${deadline}</span>
                                </button>
                            </div>
                            </div>
                            <div id="${data[id].id_content}" class="w3-container w3-hide" style="padding-left:31px;">
                                <p>${data[id].content}</p>
                            </div>
                            <button type="button" onclick="EditTask(${data[id].id_task})" class="w3-button  w3-margin-bottom w3-margin-left w3-margin-top"><i
                                    class="fas fa-edit"></i>
                                Chỉnh sửa</button>
                            <button type="button" onclick="HideDeleteTask(${data[id].id_task})" class="w3-button w w3-margin-bottom w3-margin-left w3-margin-top"><i
                                    class="fas fa-trash-alt"></i>
                                Xóa </button>
                        </div>`;

                        $('#list_of_tasks').prepend(task);
                        $("#" + data[id].id_check).prop("checked", false);
                    }
                    if (data[id].task_status == 1) {
                        var deadline = data[id].deadline.slice(0, 10);
                        deadline = getFormattedDate(deadline);
                        var task = `<div class="w3-card w3-white w3-round w3-margin-left w3-margin task" id="${data[id].id_task}">
                        <div class="w3-row">
                        <div class="w3-col" style="width: 15px;margin-left: 10px;margin-right:5px;padding-top:13px;">
                            <input type="checkbox" id="${data[id].id_check}" onchange="CheckTask(${data[id].id_task})">
                        </div>
                        <div class="w3-col" style="width: calc(100% - 30px);">
                            <button onclick="showtask('${data[id].id_content}');" type="button" class="w3-button w3-block w3-left-align" style="padding-left:31px;font-size: 20px;">
                            <span class="finish" id="${data[id].id_title}">${data[id].title}</span>
                            <span class="w3-right w3-opacity" style="font-size:13px;">${data[id].author}</span>
                            <br>
                            <span class="w3-opacity" id="${data[id].id_deadline}" style="font-size: 13px;"> Đến hạn: ${deadline}</span>
                            </button>
                        </div>
                        </div>
                        <div id="${data[id].id_content}" class="w3-container w3-hide" style="padding-left:31px;">
                            <p>${data[id].content}</p>
                        </div>
                        <button type="button" onclick="EditTask(${data[id].id_task})" class="w3-button  w3-margin-bottom w3-margin-left w3-margin-top"><i
                                class="fas fa-edit"></i>
                            Chỉnh sửa</button>
                        <button type="button" onclick="HideDeleteTask(${data[id].id_task})" class="w3-button w w3-margin-bottom w3-margin-left w3-margin-top"><i
                                class="fas fa-trash-alt"></i>
                            Xóa </button>
                    </div>`;
                        $('#list_of_tasks').prepend(task);
                        $("#" + data[id].id_check).prop("checked", true);
                    }
                }

            }
        })
    }
});

$('#progress').click(function () {
    // neu dang active thi se khong lam gi ca
    element = document.getElementById('progress');
    if (element.classList.contains('w3-yellow') == true) {
        return

    } else {
        var list_task = document.getElementsByClassName('task');
        while (list_task.length > 0) {
            list_task[0].parentNode.removeChild(list_task[0]);
        }
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/getadmin/",
            contentType: 'application/json',
            success: function (response) {
                var data = JSON.parse(JSON.stringify(response));
                for (id = 0; id < data.length; id++) {
                    if (data[id].task_status == 0) {
                        var deadline = data[id].deadline.slice(0, 10);
                        deadline = getFormattedDate(deadline);
                        var task = `<div class="w3-card w3-white w3-round w3-margin-left w3-margin task" id="${data[id].id_task}">
                    <div class="w3-row">
                    <div class="w3-col" style="width: 15px;margin-left: 10px;margin-right:5px;padding-top:13px;">
                        <input type="checkbox" id="${data[id].id_check}" onchange="CheckTask(${data[id].id_task})">
                    </div>
                    <div class="w3-col" style="width: calc(100% - 30px);">
                        <button onclick="showtask('${data[id].id_content}');" type="button" class="w3-button w3-block w3-left-align" style="padding-left:31px;font-size: 20px;">
                        <span class="unfinish" id="${data[id].id_title}">${data[id].title}</span>
                        <span class="w3-right w3-opacity" style="font-size:13px;">${data[id].author}</span>
                        <br>
                        <span class="w3-opacity" id="${data[id].id_deadline}" style="font-size: 13px;"> Đến hạn: ${deadline}</span>
                        </button>
                    </div>
                    </div>
                    <div id="${data[id].id_content}" class="w3-container w3-hide" style="padding-left:31px;">
                        <p>${data[id].content}</p>
                    </div>
                    <button type="button" onclick="EditTask(${data[id].id_task})" class="w3-button  w3-margin-bottom w3-margin-left w3-margin-top"><i
                            class="fas fa-edit"></i>
                        Chỉnh sửa</button>
                    <button type="button" onclick="HideDeleteTask(${data[id].id_task})" class="w3-button w w3-margin-bottom w3-margin-left w3-margin-top"><i
                            class="fas fa-trash-alt"></i>
                        Xóa </button>
                </div>`;

                        $('#list_of_tasks').prepend(task);
                        $("#" + data[id].id_check).prop("checked", false);
                    }
                }
                $("#progress").addClass("w3-bar-item w3-button w3-yellow w3-hover-yellow");
                $("#alltask").attr('class', '');
                $("#completed").attr('class', '');

                $("#alltask").addClass('w3-bar-item w3-button w3-hover-yellow');
                $("#completed").addClass('w3-bar-item w3-button w3-hover-yellow');

            }
        })


    }
});

$('#completed').click(function () {
    element = document.getElementById('completed');
    if (element.classList.contains('w3-yellow') == true) {
        return

    } else {
        $("#completed").addClass("w3-bar-item w3-button w3-yellow w3-hover-yellow");
        $("#alltask").attr('class', '');
        $("#progress").attr('class', '');

        $("#alltask").addClass('w3-bar-item w3-button w3-hover-yellow');
        $("#progress").addClass('w3-bar-item w3-button w3-hover-yellow');
        var list_task = document.getElementsByClassName('task');
        while (list_task.length > 0) {
            list_task[0].parentNode.removeChild(list_task[0]);
        }
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/getadmin/",
            contentType: 'application/json',
            success: function (response) {
                var data = JSON.parse(JSON.stringify(response));
                for (id = 0; id < data.length; id++) {
                    if (data[id].task_status == 1) {
                        var deadline = data[id].deadline.slice(0, 10);
                        deadline = getFormattedDate(deadline);
                        var task = `<div class="w3-card w3-white w3-round w3-margin-left w3-margin task" id="${data[id].id_task}">
                        <div class="w3-row">
                        <div class="w3-col" style="width: 15px;margin-left: 10px;margin-right:5px;padding-top:13px;">
                            <input type="checkbox" id="${data[id].id_check}" onchange="CheckTask(${data[id].id_task})">
                        </div>
                        <div class="w3-col" style="width: calc(100% - 30px);">
                            <button onclick="showtask('${data[id].id_content}');" type="button" class="w3-button w3-block w3-left-align" style="padding-left:31px;font-size: 20px;">
                            <span class="finish" id="${data[id].id_title}">${data[id].title}</span>
                            <span class="w3-right w3-opacity" style="font-size:13px;">${data[id].author}</span>
                            <br>
                            <span class="w3-opacity" id="${data[id].id_deadline}" style="font-size: 13px;"> Đến hạn: ${deadline}</span>
                            </button>
                        </div>
                        </div>
                        <div id="${data[id].id_content}" class="w3-container w3-hide" style="padding-left:31px;">
                            <p>${data[id].content}</p>
                        </div>
                        <button type="button" onclick="EditTask(${data[id].id_task})" class="w3-button  w3-margin-bottom w3-margin-left w3-margin-top"><i
                                class="fas fa-edit"></i>
                            Chỉnh sửa</button>
                        <button type="button" onclick="HideDeleteTask(${data[id].id_task})" class="w3-button w w3-margin-bottom w3-margin-left w3-margin-top"><i
                                class="fas fa-trash-alt"></i>
                            Xóa </button>
                    </div>`;

                        $('#list_of_tasks').prepend(task);
                        $("#" + data[id].id_check).prop("checked", true);
                    }
                }

            }
        })

    }
});

$(function () {
    $(".calendar").datepicker({
        dateFormat: 'dd/mm/yy',
        firstDay: 1
    });

    $(document).on('click', '.date-picker .input', function (e) {
        var $me = $(this),
            $parent = $me.parents('.date-picker');
        $parent.toggleClass('open');
    });


    $(".calendar").on("change", function () {
        var $me = $(this),
            $selected = $me.val(),
            $parent = $me.parents('.date-picker');
        $parent.find('.result').children('span').html($selected);
    });
});

const fInputs = document.querySelectorAll('.btcd-f-input>div>input')

function getFileSize(size) {
    let _size = size
    let unt = ['Bytes', 'KB', 'MB', 'GB'],
        i = 0;
    while (_size > 900) {
        _size /= 1024;
        i++;
    }
    return (Math.round(_size * 100) / 100) + ' ' + unt[i];
}

function delItem(el) {
    fileList = {
        files: []
    }
    let fInp = el.parentNode.parentNode.parentNode.querySelector('input[type="file"]')
    for (let i = 0; i < fInp.files.length; i++) {
        fileList.files.push(fInp.files[i])
    }
    fileList.files.splice(el.getAttribute('data-index'), 1)

    fInp.files = createFileList(...fileList.files)
    if (fInp.files.length > 0) {
        el.parentNode.parentNode.parentNode.querySelector('.btcd-f-title').innerHTML = `${fInp.files.length} File Selected`
    } else {
        el.parentNode.parentNode.parentNode.querySelector('.btcd-f-title').innerHTML = 'No File Chosen'
    }
    el.parentNode.remove()
}

function fade(element) {
    let op = 1; // initial opacity
    let timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    let op = 0.01; // initial opacity
    element.style.opacity = op;
    element.style.display = 'flex';
    let timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 13);
}

function get_browser() {
    let ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
            name: 'IE',
            version: (tem[1] || '')
        };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/)
        if (tem != null) {
            return {
                name: 'Opera',
                version: tem[1]
            };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
}

for (let inp of fInputs) {
    inp.parentNode.querySelector('.btcd-inpBtn>img').src = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGlkPSJDbGlwIj48cGF0aCBkPSJtMTIuMDggNTcuNzQ5YTkgOSAwIDAgMCAxMi43MjggMGwzMS4xMTItMzEuMTEzYTEzIDEzIDAgMSAwIC0xOC4zODQtMTguMzg1bC0yMC41MDcgMjAuNTA2IDEuNDE1IDEuNDE1IDIwLjUwNi0yMC41MDZhMTEgMTEgMCAxIDEgMTUuNTU2IDE1LjU1NmwtMzEuMTEyIDMxLjExMmE3IDcgMCAwIDEgLTkuOS05LjlsMjYuODctMjYuODdhMyAzIDAgMCAxIDQuMjQyIDQuMjQzbC0xNi4yNjMgMTYuMjY0IDEuNDE0IDEuNDE0IDE2LjI2NC0xNi4yNjNhNSA1IDAgMCAwIC03LjA3MS03LjA3MWwtMjYuODcgMjYuODdhOSA5IDAgMCAwIDAgMTIuNzI4eiIvPjwvZz48L3N2Zz4='
    inp.addEventListener('mousedown', function (e) {
        setPrevData(e)
    })
    inp.addEventListener('change', function (e) {
        handleFile(e)
    })
}

let fileList = {
    files: []
}
let fName = null
let mxSiz = null

function setPrevData(e) {
    if (e.target.hasAttribute('multiple') && fName !== e.target.name) {
        fName = e.target.name
        fileList = fileList = {
            files: []
        }
        if (e.target.files.length > 0) {
            for (let i = 0; i < e.target.files.length; i += 1) {
                console.log(e.target.files[i])
                fileList.files.push(e.target.files[i])
            }
        }
    }
}

function handleFile(e) {
    let err = []
    const fLen = e.target.files.length;
    mxSiz = e.target.parentNode.querySelector('.f-max')
    mxSiz = mxSiz != null && (Number(mxSiz.innerHTML.replace(/\D/g, '')) * Math.pow(1024, 2))

    if (e.target.hasAttribute('multiple')) {
        for (let i = 0; i < fLen; i += 1) {
            fileList.files.push(e.target.files[i])
        }
    } else {
        fileList.files.push(e.target.files[0])
    }

    //type validate
    if (e.target.hasAttribute('accept')) {
        let tmpf = []
        let type = new RegExp(e.target.getAttribute('accept').split(",").join("$|") + '$', 'gi')
        for (let i = 0; i < fileList.files.length; i += 1) {
            if (fileList.files[i].name.match(type)) {
                tmpf.push(fileList.files[i])
            } else {
                err.push('Wrong File Type Selected')
            }
        }
        fileList.files = tmpf
    }

    // size validate
    if (mxSiz > 0) {
        let tmpf = []
        for (let i = 0; i < fileList.files.length; i += 1) {
            if (fileList.files[i].size < mxSiz) {
                tmpf.push(fileList.files[i])
                mxSiz -= fileList.files[i].size
            } else {
                console.log('rejected', i, fileList.files[i].size)
                err.push('Max Upload Size Exceeded')
            }
        }
        fileList.files = tmpf
    }

    if (e.target.hasAttribute('multiple')) {
        e.target.files = createFileList(...fileList.files)
    } else {
        e.target.files = createFileList(fileList.files[fileList.files.length - 1])
        fileList = {
            files: []
        }
    }

    // set File list view
    if (e.target.files.length > 0) {
        e.target.parentNode.querySelector('.btcd-f-title').innerHTML = e.target.files.length + ' File Selected'
        e.target.parentNode.parentNode.querySelector('.btcd-files').innerHTML = ''
        for (let i = 0; i < e.target.files.length; i += 1) {
            let img = null
            if (e.target.files[i].type.match(/image-*/)) {
                img = window.URL.createObjectURL(e.target.files[i])
            } else {
                img = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzNTIgNDI5LjEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM1MiA0MjkuMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzAwNEJCNzt9DQo8L3N0eWxlPg0KPHBhdGggZD0iTTQwOC44LDY2Ljh2MzI3LjRjMCwyNy40LDIyLjgsNDkuOCw1MC4zLDQ5LjhoMjM5LjNjMjcuNSwwLDQ5LjgtMjIuMyw0OS44LTQ5LjhWMTE2Yy0wLjEtMi42LTEuMi01LjItMy4xLTdsLTg4LjktODkuMQ0KCWMtMS45LTEuOS00LjQtMi45LTcuMS0yLjloLTE5MEM0MzEuNiwxNyw0MDguOCwzOS40LDQwOC44LDY2Ljh6IE03MTMuOCwxMDUuOUg2ODNjLTYuMywwLTEyLjQtMi41LTE2LjgtNi45DQoJYy00LjUtNC41LTctMTAuNS02LjktMTYuOHYtMzFMNzEzLjgsMTA1Ljl6IE00MjguOCw2Ni44YzAtMTYuNSwxMy45LTI5LjgsMzAuMy0yOS44aDE4MC4ydjQ1LjFjMCwxMS42LDQuNiwyMi43LDEyLjgsMzENCgljOC4yLDguMiwxOS4zLDEyLjgsMzAuOSwxMi44aDQ1LjF2MjY4LjVjMCwxNi41LTEzLjksMjkuOC0zMC4zLDI5LjhINDU5LjFjLTE2LjYsMC0zMC4zLTEzLjQtMzAuMy0yOS44VjY2Ljh6Ii8+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjc3LjIsMTY2LjlIMTMwLjZjLTUuMSwwLTkuMiw0LjEtOS4yLDkuMnM0LjEsOS4yLDkuMiw5LjJoMTQ2LjVjNS4xLDAsOS4yLTQuMSw5LjItOS4xDQoJQzI4Ni40LDE3MSwyODIuMywxNjYuOSwyNzcuMiwxNjYuOXoiLz4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05My41LDE2Ni45SDY2LjRjLTUuMSwwLTkuMiw0LjEtOS4yLDkuMnM0LjEsOS4yLDkuMiw5LjJoMjcuMWM1LjEsMCw5LjItNC4xLDkuMi05LjJTOTguNiwxNjYuOSw5My41LDE2Ni45eiINCgkvPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTI3Ny4yLDI0MC4zSDEzMC42Yy01LjEsMC05LjIsNC4xLTkuMiw5LjJjMCw1LjEsNC4xLDkuMiw5LjIsOS4yaDE0Ni41YzUuMSwwLDkuMi00LjEsOS4yLTkuMQ0KCVMyODIuMywyNDAuNCwyNzcuMiwyNDAuM3oiLz4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05My41LDI0MC4zSDY2LjRjLTUuMSwwLTkuMiw0LjEtOS4yLDkuMmMwLDUuMSw0LjEsOS4yLDkuMiw5LjJoMjcuMWM1LjEsMCw5LjItNC4xLDkuMi05LjINCglDMTAyLjcsMjQ0LjQsOTguNiwyNDAuMyw5My41LDI0MC4zeiIvPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTTI3Ny4yLDMxMy44SDEzMC42Yy01LjEsMC05LjIsNC4xLTkuMiw5LjJjMCw1LjEsNC4xLDkuMiw5LjIsOS4yaDE0Ni41YzUuMSwwLDkuMi00LjEsOS4yLTkuMQ0KCUMyODYuNCwzMTgsMjgyLjMsMzEzLjgsMjc3LjIsMzEzLjh6Ii8+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTMuNSwzMTMuOEg2Ni40Yy01LjEsMC05LjIsNC4xLTkuMiw5LjJjMCw1LjEsNC4xLDkuMiw5LjIsOS4yaDI3LjFjNS4xLDAsOS4yLTQuMSw5LjItOS4yDQoJQzEwMi43LDMxNy45LDk4LjYsMzEzLjgsOTMuNSwzMTMuOHoiLz4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNjMsNDEyLjFIODljLTQxLjQsMC03NS0zMy42LTc1LTc1di0yNDVjMC00MS40LDMzLjYtNzUsNzUtNzVoMTQ3LjVjOCwwLDE1LjcsMywyMS42LDguNWw2OSw2My42DQoJCWM2LjksNi4zLDEwLjgsMTUuMywxMC44LDI0Ljd2MjIzLjJDMzM4LDM3OC40LDMwNC40LDQxMi4xLDI2Myw0MTIuMXogTTg5LDM3LjNjLTMwLjIsMC01NC43LDI0LjYtNTQuNyw1NC43djI0NQ0KCQljMCwzMC4yLDI0LjYsNTQuNyw1NC43LDU0LjdoMTc0YzMwLjIsMCw1NC43LTI0LjYsNTQuNy01NC43VjExMy44YzAtMy43LTEuNi03LjMtNC4zLTkuOGwtNjktNjMuNmMtMi4yLTItNS0zLjEtNy45LTMuMUg4OXoiLz4NCjwvZz4NCjwvc3ZnPg0K'
            }
            e.target.parentNode.parentNode.querySelector('.btcd-files').insertAdjacentHTML('beforeend', `<div>
                    <img src="${img}" alt="img"  title="${e.target.files[i].name}">
                    <div>
                        <span title="${e.target.files[i].name}">${e.target.files[i].name}</span>
                        <br/>
                        <small>${getFileSize(e.target.files[i].size)}</small>
                    </div>
                    <button type="button" onclick="delItem(this)" data-index="${i}" title="Remove This File"><span>&times;</span></button>
                </div>`)
        }
    }

    // set eror
    if (err.length > 0) {
        for (let i = 0; i < err.length; i += 1) {
            e.target.parentNode.parentNode.querySelector('.btcd-files').insertAdjacentHTML('afterbegin', `
            <div style="background: #fff2f2;color: darkred;display:none" class="btcd-f-err">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjg2LjA1NCIgaGVpZ2h0PSIyODYuMDU0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoKIDxnPgogIDx0aXRsZT5iYWNrZ3JvdW5kPC90aXRsZT4KICA8cmVjdCBmaWxsPSJub25lIiBpZD0iY2FudmFzX2JhY2tncm91bmQiIGhlaWdodD0iNDAyIiB3aWR0aD0iNTgyIiB5PSItMSIgeD0iLTEiLz4KIDwvZz4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8ZyBzdHJva2U9Im51bGwiIGlkPSJzdmdfMSI+CiAgIDxwYXRoIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18yIiBmaWxsPSIjOTEwNjAxIiBkPSJtMTQzLjAyNjk5Nyw1Ni4wMDAwMDVjLTQ4LjA2MDg2NSwwIC04Ny4wMjY5OTcsMzguOTY2MTMxIC04Ny4wMjY5OTcsODcuMDI2OTk3YzAsNDguMDY2MzQyIDM4Ljk2NjEzMSw4Ny4wMjY5OTcgODcuMDI2OTk3LDg3LjAyNjk5N2M0OC4wNjYzNDIsMCA4Ny4wMjY5OTcsLTM4Ljk1NTE3OSA4Ny4wMjY5OTcsLTg3LjAyNjk5N2MwLC00OC4wNjA4NjUgLTM4Ljk2MTI2NCwtODcuMDI2OTk3IC04Ny4wMjY5OTcsLTg3LjAyNjk5N3ptMCwxNTcuNzM2MTY2Yy0zOS4wNTMxNDIsMCAtNzAuNzA5MTY5LC0zMS42NTYwMjcgLTcwLjcwOTE2OSwtNzAuNzA5MTY5czMxLjY1NjAyNywtNzAuNzA5MTY5IDcwLjcwOTE2OSwtNzAuNzA5MTY5czcwLjcwOTE2OSwzMS42NTYwMjcgNzAuNzA5MTY5LDcwLjcwOTE2OXMtMzEuNjU2MDI3LDcwLjcwOTE2OSAtNzAuNzA5MTY5LDcwLjcwOTE2OXptMC4wMDU0NzYsLTExOS41Njk1NThjLTYuMjMzMTIxLDAgLTEwLjk0OTMzNywzLjI1Mjg1NyAtMTAuOTQ5MzM3LDguNTA2OTU2bDAsNDguMTkxMDc3YzAsNS4yNTk1NzYgNC43MTU2MDgsOC41MDE0OCAxMC45NDkzMzcsOC41MDE0OGM2LjA4MTAwNCwwIDEwLjk0OTMzNywtMy4zNzc1OTIgMTAuOTQ5MzM3LC04LjUwMTQ4bDAsLTQ4LjE5MTA3N2MtMC4wMDA2MDgsLTUuMTI5MzY0IC00Ljg2ODMzMywtOC41MDY5NTYgLTEwLjk0OTMzNywtOC41MDY5NTZ6bTAsNzYuMDU2MzY0Yy01Ljk4ODUxOCwwIC0xMC44NjIzMjYsNC44NzM4MDkgLTEwLjg2MjMyNiwxMC44NjcxOTRjMCw1Ljk4MzA0MSA0Ljg3MzgwOSwxMC44NTY4NSAxMC44NjIzMjYsMTAuODU2ODVzMTAuODU2ODUsLTQuODczODA5IDEwLjg1Njg1LC0xMC44NTY4NWMtMC4wMDA2MDgsLTUuOTkzOTk0IC00Ljg2ODMzMywtMTAuODY3MTk0IC0xMC44NTY4NSwtMTAuODY3MTk0eiIvPgogIDwvZz4KICA8ZyBpZD0ic3ZnXzMiLz4KICA8ZyBpZD0ic3ZnXzQiLz4KICA8ZyBpZD0ic3ZnXzUiLz4KICA8ZyBpZD0ic3ZnXzYiLz4KICA8ZyBpZD0ic3ZnXzciLz4KICA8ZyBpZD0ic3ZnXzgiLz4KICA8ZyBpZD0ic3ZnXzkiLz4KICA8ZyBpZD0ic3ZnXzEwIi8+CiAgPGcgaWQ9InN2Z18xMSIvPgogIDxnIGlkPSJzdmdfMTIiLz4KICA8ZyBpZD0ic3ZnXzEzIi8+CiAgPGcgaWQ9InN2Z18xNCIvPgogIDxnIGlkPSJzdmdfMTUiLz4KICA8ZyBpZD0ic3ZnXzE2Ii8+CiAgPGcgaWQ9InN2Z18xNyIvPgogPC9nPgo8L3N2Zz4=" alt="img">
                <span>${err[i]}</span>
            </div>`)
        }
        const errNods = e.target.parentNode.parentNode.querySelectorAll('.btcd-files>.btcd-f-err')
        for (let i = 0; i < errNods.length; i += 1) {
            unfade(errNods[i])
            setTimeout(() => {
                fade(errNods[i])
            }, 3000);
            setTimeout(() => {
                errNods[i].remove()
            }, 4000);
        }
        err = []
    }

}

function toggleFunction() {
    var x = document.getElementById("navMobile");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// function showtask() {
//     var coll = document.getElementsByClassName("collapsible");
//     var i;
//     for (i = 0; i < coll.length; i++) {
//         coll[i].addEventListener("click", function () {
//             this.classList.toggle("active");
//             var content = this.nextElementSibling;
//             if (content.style.display === "block") {
//                 content.style.display = "none";
//             } else {
//                 content.style.display = "block";
//             }
//         });
//     }
// }

function showtask(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
    console.log('done');
}

function Userlogout() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/logout/",
        success: function (response) {
            if (response == "done") {
                window.location.href = "http://127.0.0.1:8000/";
            }
        }
    })

}

function getFormattedDate(date) {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    console.log(year);
    console.log(month);
    console.log(day);
    return day + '/' + month + '/' + year;
}


$(document).ready(function () {
    // showtask();
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/getadmin/",
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            var data = JSON.parse(JSON.stringify(response));
            for (id = 0; id < data.length; id++) {
                if (data[id].task_status == 0) {
                    var deadline = data[id].deadline.slice(0, 10);
                    deadline = getFormattedDate(deadline);
                    var task = `<div class="w3-card w3-white w3-round w3-margin-left w3-margin task" id="${data[id].id_task}">
                        <div class="w3-row">
                        <div class="w3-col" style="width: 15px;margin-left: 10px;margin-right:5px;padding-top:13px;">
                            <input type="checkbox" id="${data[id].id_check}" onchange="CheckTask(${data[id].id_task})">
                        </div>
                        <div class="w3-col" style="width: calc(100% - 30px);">
                            <button onclick="showtask('${data[id].id_content}');" type="button" class="w3-button w3-block w3-left-align" style="padding-left:31px;font-size: 20px;">
                            <span class="unfinish" id="${data[id].id_title}">${data[id].title}</span>
                            <span class="w3-right w3-opacity" style="font-size:13px;">${data[id].author}</span>
                            <br>
                            <span class="w3-opacity" id="${data[id].id_deadline}" style="font-size: 13px;"> Đến hạn: ${deadline}</span>
                            </button>
                        </div>
                        </div>
                        <div id="${data[id].id_content}" class="w3-container w3-hide" style="padding-left:31px;">
                            <p>${data[id].content}</p>
                        </div>
                        <button type="button" onclick="EditTask(${data[id].id_task})" class="w3-button  w3-margin-bottom w3-margin-left w3-margin-top"><i
                                class="fas fa-edit"></i>
                            Chỉnh sửa</button>
                        <button type="button" onclick="HideDeleteTask(${data[id].id_task})" class="w3-button w w3-margin-bottom w3-margin-left w3-margin-top"><i
                                class="fas fa-trash-alt"></i>
                            Xóa </button>
                    </div>`;

                    $('#list_of_tasks').prepend(task);
                    $("#" + data[id].id_check).prop("checked", false);
                }
                if (data[id].task_status == 1) {
                    var deadline = data[id].deadline.slice(0, 10);
                    deadline = getFormattedDate(deadline);
                    var task = `<div class="w3-card w3-white w3-round w3-margin-left w3-margin task" id="${data[id].id_task}">
                    <div class="w3-row">
                    <div class="w3-col" style="width: 15px;margin-left: 10px;margin-right:5px;padding-top:13px;">
                        <input type="checkbox" id="${data[id].id_check}" onchange="CheckTask(${data[id].id_task})">
                    </div>
                    <div class="w3-col" style="width: calc(100% - 30px);">
                        <button onclick="showtask('${data[id].id_content}');" type="button" class="w3-button w3-block w3-left-align" style="padding-left:31px;font-size: 20px;">
                        <span class="finish" id="${data[id].id_title}">${data[id].title}</span>
                        <span class="w3-right w3-opacity" style="font-size:13px;">${data[id].author}</span>
                        <br>
                        <span class="w3-opacity" id="${data[id].id_deadline}" style="font-size: 13px;"> Đến hạn: ${deadline}</span>
                        </button>
                    </div>
                    </div>
                    <div id="${data[id].id_content}" class="w3-container w3-hide" style="padding-left:31px;">
                        <p>${data[id].content}</p>
                    </div>
                    <button type="button" onclick="EditTask(${data[id].id_task})" class="w3-button  w3-margin-bottom w3-margin-left w3-margin-top"><i
                            class="fas fa-edit"></i>
                        Chỉnh sửa</button>
                    <button type="button" onclick="HideDeleteTask(${data[id].id_task})" class="w3-button w w3-margin-bottom w3-margin-left w3-margin-top"><i
                            class="fas fa-trash-alt"></i>
                        Xóa </button>
                </div>`;


                    $('#list_of_tasks').prepend(task);
                    $("#" + data[id].id_check).prop("checked", true);
                }
            }

        }
    })
});


$('#addtask').on('click', function (event) {
    let content = document.getElementById('content').value;
    let title = document.getElementById('title').value;
    let deadline = document.getElementById('dateline').innerText;
    var csrftoken = $("input[name=csrfmiddlewaretoken]").val();
    var id_content = 'content' + (new Date()).getTime();
    var id_check = 'check' + (new Date()).getTime();
    var author = document.getElementById('username').innerText;
    // var id_edit = 'edit' + (new Date()).getTime();
    // var id_delete = 'delete' + (new Date()).getTime();
    var id_deadline = 'deadline' + (new Date()).getTime();
    var id_task = 'task' + (new Date()).getTime();
    var id_title = "title" + (new Date()).getTime();
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/createTask/",
        data: {
            csrfmiddlewaretoken: csrftoken,
            'title': title,
            'content': content,
            'deadline': deadline,
            'id_content': id_content,
            'id_check': id_check,
            'id_task': id_task,
            'id_deadline': id_deadline,
            'id_title': id_title,
            'author': author,
            'task_status': 0
        },

        success: function (response) {
            if (response == "done") {
                var task = `<div class="w3-card w3-white w3-round w3-margin-left w3-margin task" id="${id_task}">
                <div class="w3-row">
                <div class="w3-col" style="width: 15px;margin-left: 10px;margin-right:5px;padding-top:13px;">
                    <input type="checkbox" id="${id_check}" onclick="CheckTask(${id_task});">
                </div>
                <div class="w3-col" style="width: calc(100% - 30px);">
                    <button onclick="showtask('${id_content}');" type="button" class="w3-button w3-block w3-left-align" style="padding-left:31px;font-size: 20px;">
                    <span class="unfinish" id="${id_title}">${title}</span>
                    <span class="w3-right w3-opacity" style="font-size:13px;">${author}</span>
                    <br>
                    <span class="w3-opacity" id="${id_deadline}" style="font-size: 13px;"> Đến hạn: ${deadline}</span>
                    </button>
                </div>
                </div>
                <div id="${id_content}" class="w3-container w3-hide" style="padding-left:31px;">
                    <p>${content}</p>
                </div>
                <button type="button" onclick="EditTask(${id_task})" class="w3-button  w3-margin-bottom w3-margin-left w3-margin-top"><i
                        class="fas fa-edit"></i>
                    Chỉnh sửa</button>
                <button type="button" onclick="HideDeleteTask(${id_task})" class="w3-button w w3-margin-bottom w3-margin-left w3-margin-top"><i
                        class="fas fa-trash-alt"></i>
                    Xóa </button>
            </div>`;

                $('#list_of_tasks').prepend(task);
                QuitForm('CreateTaskForm');
            }
        }
    })

})

function CheckTask(id) {
    var pre_id = id.id.slice(4);
    var checkbtn = document.getElementById('check' + pre_id);
    var csrftoken = $("input[name=csrfmiddlewaretoken]").val();
    if (checkbtn.checked == true) {
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/checkTask/",
            data: {
                'id_task': id.id,
                'task_status': 1,
            },
            success: function (response) {
                console.log(response);
                var title = document.getElementById('title' + pre_id);
                title.classList.remove("unfinish")
                title.classList.add("finish");

            }
        })


    }
    if (checkbtn.checked == false) {
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/checkTask/",
            data: {
                'id_task': id.id,
                'task_status': 0,
            },
            success: function (response) {
                var title = document.getElementById('title' + pre_id);
                title.classList.remove("finish");
                title.classList.add("unfinish");
            }
        })
    }
};


function EditTask(id) {
    blurModal = document.getElementsByClassName("modal visible loaded")[0];
    blurModal.style.zIndex = "10";
    blurModal.className += " w3-opacity-max" + " w3-black";

    addTaskCol = document.getElementById("addTaskCol");
    addTaskCol.hidden = true;


    CreateTaskForm = document.getElementById("ChangeTaskForm");
    CreateTaskForm.removeAttribute("hidden");
    var pre_id = id.id.slice(4);
    let title = document.getElementById('title' + pre_id).innerHTML;
    let content = document.getElementById('content' + pre_id).getElementsByTagName('p')[0].innerHTML;
    let deadline = document.getElementById('deadline' + pre_id).innerHTML.slice(10);
    document.getElementById('new_title').value = title;
    document.getElementById('new_content').value = content;
    document.getElementById('new_dateline').textContent = deadline;
    document.getElementById('task_id').textContent = id.id;

};

function HideDeleteTask(id) {
    blurModal = document.getElementsByClassName("modal visible loaded")[0];
    blurModal.style.zIndex = "10";
    blurModal.className += " w3-opacity-max" + " w3-black";

    DelTaskForm = document.getElementById("del-task");
    DelTaskForm.removeAttribute("hidden");
    $('#deletetask').on("click", function () {
        let id_task = id.id;
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/deleteTask/",
            data: {
                'id_task': id_task,
            },

            success: function (response) {
                document.getElementById(id_task).remove();
                QuitForm('del-task');
            }
        })
    })
}


$('#changetask').on("click", function () {
    let content = document.getElementById('new_content').value;
    let title = document.getElementById('new_title').value;
    let deadline = document.getElementById('new_dateline').innerText;
    let id_task = document.getElementById('task_id').innerText;
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/changeTask/",
        data: {
            'new_title': title,
            'new_content': content,
            'new_deadline': deadline,
            'id_task': id_task,
        },

        success: function (response) {
            var id_deadline = 'deadline' + id_task.slice(4);
            var id_title = 'title' + id_task.slice(4);
            var id_content = 'content' + id_task.slice(4);
            document.getElementById(id_deadline).textContent = deadline;
            document.getElementById(id_title).innerHTML = title;
            document.getElementById(id_content).getElementsByTagName('p')[0].innerHTML = content;
            QuitForm('ChangeTaskForm');
        }
    })
});