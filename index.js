
var input=document.getElementById("input-box");
var list=document.getElementById("container");

document.querySelector(".add button").addEventListener("click", function () {
    if (input.value === "") {
        alert("Nothing added");
    } else {
        var task = document.createElement("li");
        task.innerHTML = input.value;
        task.classList.add("val");

        var x = document.createElement("input");
        x.type = "checkbox";
        x.classList.add("check");
        task.prepend(x);

        var img = document.createElement("img");
        img.src = "image.png";
        task.appendChild(img);

        list.appendChild(task);
        input.value = "";
        saveData();

        var activeButton = document.querySelector("button");
        activeButton.classList.add("pressed");

        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 100);

        for (let i = 0; i < list.querySelectorAll("li").length; i++) {
            (function (currentTask) {
                list.querySelectorAll("li img")[i].addEventListener("click", function () {
                    currentTask.remove();
                    saveData();
                });

                // Separate closure for the x event listener
                (function (checkbox) {
                    checkbox.addEventListener("change", function () {
                        strikeThrough(currentTask, this.checked);
                        saveData();
                    });
                })(x);
            })(task);
        }
    }
});

// Rest of the code remains unchanged


function strikeThrough(task, isChecked) {
    if (isChecked) {
        task.classList.add("strike");
    } else {
        task.classList.remove("strike");
    }
}

function saveData() {
    var array = [];
    for (var i = 0; i < list.querySelectorAll("li").length; i++) {
        var task= list.querySelectorAll(".val")[i];
        var x = list.querySelectorAll(".check")[i];
        var obj = {
            check: x.checked,
            data: task.textContent,
        };
        array.push(obj);
    }
    localStorage.setItem("obj", JSON.stringify(array));
}

function show() {
    var get = JSON.parse(localStorage.getItem("obj")) || [];

    for (var i = 0; i < get.length; i++) {
        var task = document.createElement("li");
        task.innerHTML = get[i].data;
        task.classList.add("val");

        var x = document.createElement("input");
        x.type = "checkbox";
        x.classList.add("check");
        x.checked = get[i].check;
        task.prepend(x);

        if (get[i].check) {
            task.classList.add("strike");
        }

        var img = document.createElement("img");
        img.src = "image.png";
        task.appendChild(img);

        list.appendChild(task);

        img.addEventListener("click"  , function () {
            this.parentNode.remove();
            saveData();
        });

        x.addEventListener("change", function () {
            strikeThrough(task, this.checked);
            saveData();
        });
    }
}

window.addEventListener("load", show);
//localStorage.clear();
