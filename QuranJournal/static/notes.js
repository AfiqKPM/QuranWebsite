const fs = require('fs');
const path = require('path');

var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var fileList = document.getElementById('fileList');
var ayatCompleted = document.getElementById('ayatCompleted');

let pathName = path.join(__dirname, 'Files');

function loadFileList() {
    fileList.innerHTML = '<option value="">Select a file</option>';
    fs.readdir(pathName, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            let option = document.createElement("option");
            option.value = file;
            option.textContent = file;
            fileList.appendChild(option);
        });
    });
}

fileList.addEventListener('change', function () {
    fileName.value = fileList.value;
    fileContents.value = "";
    ayatCompleted.value = "";
});

btnCreate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = `Ayat Completed: ${ayatCompleted.value}\nNotes: ${fileContents.value}`;
    fs.writeFile(file, contents, err => {
        if (err) return console.log(err);
        alert(fileName.value + " was created");
        loadFileList();
    });
});

btnRead.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) return console.log(err);
        let lines = data.split("\n");
        ayatCompleted.value = lines[0].replace("Ayat Completed: ", "");
        fileContents.value = lines.slice(1).join("\n").replace("Notes: ", "");
    });
});

btnDelete.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    fs.unlink(file, err => {
        if (err) return console.log(err);
        fileName.value = "";
        fileContents.value = "";
        ayatCompleted.value = "";
        alert("The file was deleted!");
        loadFileList();
    });
});

btnUpdate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = `Ayat Completed: ${ayatCompleted.value}\nNotes: ${fileContents.value}`;
    fs.writeFile(file, contents, err => {
        if (err) return console.log(err);
        alert(fileName.value + " was updated!");
        loadFileList();
    });
});

loadFileList();
