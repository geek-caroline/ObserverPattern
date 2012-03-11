/*global CustomEventsController:true, TestingExtentions:true*/
var CustomEventsController, TestingSuite;
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

    //add our example methods - am using the event 'auto' to differentiate it from
    //any real event in the DOM.  Just for demontratino purposes, to show it needn't be a 'standard'
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
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    CustomEventsController = new CustomEventsController();
    TestingSuite = new TestingSuite();
    customEventTest(CustomEventsController, TestingSuite);
}, false);

window.addEventListener("unload", function unload(event) {
    //get the customEvt to all get detached
    CustomEventsController.destroy();
    CustomEventsController = null;
    TestingSuite = null;
}, false);