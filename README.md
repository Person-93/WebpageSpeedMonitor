# WebpageSpeedMonitor
The purpose of this project to monitor the connection speed between a webpage on a client machine and a server.

*connectionTest.js* contains a function called `speedTest`.
To use this function, simply call 

`var yourSpeedtestObject = new speedTest(yourCallbackFunction);`

`yourSpeedtestObject.start();`

This will download the  20Kb file from the files directory every 2.5 seconds and it will call the callback function after every 5 downloads.

The callback will be called with one parameter, either -1 if any of the downloads failed or the average Kib/s from the last 5 tests.

To stop the downloads call `yourSpeedtestObject.stop()`.

*showConnectStatus.js* has an example usage of the speedTest that shows a banner on top of the page with the connection status.
