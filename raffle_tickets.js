// Justin Tinghao Wang
// 08-27-17

// This file contains the functoins that runs the the raffle tickets, which allow
// the user to input different raffle ticket numbers in the text box and
// present the numbers to the user in quick uccession. In addition, the user is
// able to set the speed and font size of the raffle ticket numbers.

(function() {
    "use strict";

    // use "$" to simplify syntax for later uses
    var $ = function(id) {
        return document.getElementById(id);
    };
    // declare global variables for later uses
    var result = null;
    var timer = null;
    var curSpeed = null;

    // after page onloads, run function
    window.onload = function() {

        // start/stop controls
        $("start").onclick = startOnclicks;
        $("stop").onclick = stopOnclicks;

        // size controls
        $("medium").onclick = changeSize;
        $("big").onclick = changeSize;
        $("bigger").onclick = changeSize;

        // speed controls and set up initial speed
        $("speed").selectedIndex = 2;
        curSpeed = $("speed").options[2].value;
        $("speed").onchange = changeSpeed;

        // when the start button onclicked, the text that in the text area would
        // display in the window
        function startOnclicks() {
            $("start").disabled = true;
            $("stop").disabled = false;
            buttonColor();
            $("inputBox").disabled = true;
            readInput();
        }

        // when the stop button onclicked, the changing text would stop and the
        // reading window will become blank.
        function stopOnclicks() {
            $("start").disabled = false;
            $("stop").disabled = true;
            buttonColor();
            $("inputBox").disabled = false;
            clearInterval(timer);
        }

        // sets button colors to show the state
        function buttonColor() {
            if ($("start").disabled) {
                $("start").style.backgroundColor = "lightgray";
            } else {
                $("start").style.backgroundColor = "#FFFFFF";
            }
            if ($("stop").disabled) {
                $("stop").style.backgroundColor = "lightgray";
            } else {
                $("stop").style.backgroundColor = "#FFFFFF";
            }
        }

        // set font-size of the displayed text
        function changeSize() {
            $("readingBox").style.fontSize = this.value;
        }

        // change the numbers displaying speed in the reading window
        function changeSpeed() {
            clearInterval(timer);
            curSpeed = $("speed").options[$("speed").selectedIndex].value;
            if ($("start").disabled) {
                timer = setInterval(display, curSpeed);
            }
        }

        // reads input from textbox, split the text into every word so that is
        // ready to be displayed
        function readInput() {
            var inputText = $("inputBox").value;
            result = inputText.split(/[ \t\n]+/);
            for (var i = 0; i < result.length; i++) {
                var lastChar = result[i].substring(result[i].length - 1);
                if (lastChar == ',' || lastChar == '.' || lastChar == '!' ||
                    lastChar == '?' || lastChar == ';' || lastChar == ':') {
                        result[i] = result[i].substring(0, result[i].length - 1);
                        result.splice(i + 1, 0, result[i]);
                        i = i + 1;
                    }
            }
            timer = setInterval(display, curSpeed);
        }

        // displays text word by word, stop displaying when it finishes.
        function display() {
            if ($("stop").disabled) {
                stopOnclicks();
            } else if (result.length == 0) {
                clearInterval(timer);
                readInput();
            } else {
                $("readingBox").innerHTML = result.shift();
            }
          }

    };
})();
