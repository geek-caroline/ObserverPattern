/*global CustomEventsController:true, TestingSuite:true*/
var customEventsController, testingSuite;
function customEventTest(customEventsController, testingSuite) {
    var demoButton =     document.getElementById('demo-button'),
        customEvt = customEventsController,
        testSuite = testingSuite,
        exampleCallBackFunc1 = function (data) {
            testSuite.addListItemToPage('callback1 occured and was told:' + data);
        },
        exampleCallBackFunc2 = function (data) {
            testSuite.addListItemToPage('callback2 occured and was told:' + data);
        },
        buttonCallBackFunc = function (data) {
            testSuite.addListItemToPage('button clicked and was told:' + data);
        };

    //add example methods - am using the event 'auto' to differentiate it from
    //any real event in the DOM.  Just for demontration purposes, to show it needn't be a 'standard'
    //event e.g.click/load/hover event etc
    customEvt.addListener('auto', exampleCallBackFunc1);
    customEvt.addListener('auto', exampleCallBackFunc2);

    //call the notify method
    testSuite.initNewNotifySection('auto');
    customEvt.notifyListeners('auto');

    //remove the test function
    customEvt.removeListener('auto', exampleCallBackFunc1);

    //call the notify method to produce only one item
    testSuite.initNewNotifySection('auto');
    customEvt.notifyListeners('auto');

    //set up the button to cause a 'button' notify event when clicked
    customEvt.addListener('button', buttonCallBackFunc);
    demoButton.addEventListener('click', function () {
        testSuite.initNewNotifySection('button');
        customEvt.notifyListeners('button');
    });
}


//cause the automatic code to run
window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false);
    customEventsController = new CustomEventsController();
    testingSuite = new TestingSuite();
    customEventTest(customEventsController, testingSuite);
}, false);

window.addEventListener("unload", function unload(event) {
    //clean up code to prevent memory leaks (possibly need to check this works fully in IE)
    customEventsController.destroy();
    customEventsController = null;
    testingSuite = null;
}, false);