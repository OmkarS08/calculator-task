/***HTML elements ***************/
const div1 = document.createElement("div");
div1.setAttribute("id", "container")
const div2 = document.createElement("div");
div2.setAttribute("id", "calculator")
const div3 = document.createElement("div");
div3.setAttribute("id", "result")
    /*************output1************** */
const div4 = document.createElement("div");
div4.setAttribute("id", "history")
const para1 = document.createElement("p")
para1.setAttribute("id", "history-value");
div4.append(para1);


const div5 = document.createElement("div");
div5.setAttribute("id", "output")
const para2 = document.createElement("p")
para2.setAttribute("id", "output-value");
div4.append(para2);


/****************buttons****************** */
const div6 = document.createElement("div");
div6.setAttribute("id", "keyboard");
div6.innerHTML = `
				<button class="operator" id="clear">C</button>
				<button class="operator" id="backspace">CE</button>
				<button class="operator" id="%">%</button>
				<button class="operator" id="/">&#247;</button>
				<button class="number" id="7">7</button>
				<button class="number" id="8">8</button>
				<button class="number" id="9">9</button>
				<button class="operator" id="*">&times;</button>
				<button class="number" id="4">4</button>
				<button class="number" id="5">5</button>
				<button class="number" id="6">6</button>
				<button class="operator" id="-">-</button>
				<button class="number" id="1">1</button>
				<button class="number" id="2">2</button>
				<button class="number" id="3">3</button>
				<button class="operator" id="+">+</button>
				<button class="empty" id="empty"></button>
				<button class="number" id="0">0</button>
				<button class="empty" id="empty"></button>
				<button class="operator" id="=">=</button>`

/*************append**************** */
div3.append(div4);
div3.append(div5);
div2.append(div3);
div1.append(div2);
div2.append(div6);
document.body.append(div1);

/*********functioning********* */


function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        } else if (this.id == "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) { //if output has a value
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else {
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output != "" || history != "") {
                output = output == "" ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") {
                    var result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }

    });
}
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        var output = reverseNumberFormat(getOutput());
        if (output != NaN) { //if output is a number
            output = output + this.id;
            printOutput(output);
        }
    });
}