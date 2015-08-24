function speedTest(callback) {    
    //--------------------------------
    //----------SETTINGS--------------
    //--------------------------------
    ////the directory containing the files to download
    var file = 'files/20kb.jpg';
    var fileSize = 20; //in Kb

    //how much time (in ms) to wait in between download tests
    var timeBetTests = 2500;

    //how many results go into the average that is passed to the callback function
    var testResultsLength = 5;
    //--------------------------------
    //---------end of SETTINGS--------
    //--------------------------------

    
    var testResults = [];
    var runTest_Timer;  
    var startTime;
    var testResultsSum;
    var testResultsAvg;
    
    var timedOut;

    //-------state variables-------
    var testNum;
    //----end of state variables---

    //insert image object into page
    var imgID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5); //random string of 5 chars
    $("body").append("<img id='" + imgID + "' style='display:none' src='" + file + "'></img>");
    var imgConnection = $("#" + imgID);

    //set error and load functions
    var errorHandler = $.proxy(imgError, window);
    var successHandler = $.proxy(imgLoad, window);
    imgConnection.error(errorHandler);
    imgConnection.on('load', successHandler);

    //need to set this after the image functions are set becuase setting the 
    // functions causes it to run
    testNum = 0;



    function nextTest() {
        startTime = Date.now();
        var newSrc = file + '?time=' + startTime;

        imgConnection.attr('src', newSrc);
    }//end of nextTest

    function imgError() {
        //if testNum has not been set do nothing
        if (isNaN(testNum))
            return

        callback(-1);

        //set last few test results to 0
        for (var l = testResults.length, i = l - testResultsLength; i < l; i++)
            if (i >= 0)
                testResults[i] = 0;

        imgComplete();
    }

    function imgLoad() {
        //if testNum has not been set do nothing
        if (isNaN(testNum))
            return

        //calculate the time from startTime until now and multiply by 1K to get seconds
        testResults[testNum] = fileSize / (Date.now() - startTime) * 1000;

        //calculate the average of the last few results if we've run 5 or more
        // and run the callback function
        if (testResults.length >= testResultsLength) {
            testResultsSum = 0;
            for (var l = testResults.length, i = l - testResultsLength; i < l; i++)
                testResultsSum += testResults[i];
            testResultsAvg = testResultsSum / testResultsLength;

            callback(testResultsAvg);
        }//end of: if (testResults.length >= testResultsLength)

        imgComplete();
    }//end if imgLoad


    //this function is called after imgLoad and after imgError
    function imgComplete() {
        testNum++;
        runTest_timer = setTimeout(nextTest, timeBetTests);
    }
    


    //public function to start the test
    this.start = function () {
        nextTest();
        runTest_timer = setTimeout(nextTest, timeBetTests);
    }


    //public function to stop the test
    this.stop = function () {
        //stop the tests
        clearTimeout(runTest_Timer);

        //delete the result set
        testResults = null;

        //reset the state variables
        testNum = 0;

        //delete the image
        imgConnection.remove();
    }
} //end of speedTest