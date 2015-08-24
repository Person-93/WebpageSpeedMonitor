window.onload = function () {
    var myTest = new speedTest(updateConnectStatus);

    myTest.start();
}

function updateConnectStatus(speed) {
    //---SETTINGS-----
    var goodConnection = 500;
    var acceptableConnection = 300;
    var display = $("#connectionDisplay");
    //--end SETTINGS--

    if (speed >= goodConnection)
        display.text("Good connection").css('background-color', 'green');
    else if (speed >= acceptableConnection)
        display.text("Acceptable connection").css('background-color', 'orange');
    else
        display.text("Bad connection").css('background-color', 'red');
}