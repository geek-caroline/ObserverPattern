/*global CustomEventsController:true*/
function customEventTest() {
    var demoButton =     document.getElementById('demo-button'),
        customEvt = new CustomEventsController(),
        exampleCallBackFunc1 = function (data) {
            //uses the scope of the calling observer which holds these testing methods against it
            //demonstrating the scope use applied used by the observer class
            this.testingExtention.addListItemToPage('callback1 occured and was told:' + data);
        },
        exampleCallBackFunc2 = function (data) {
            this.testingExtention.addListItemToPage('callback2 occured and was told:' + data);
        },
        buttonCallBackFunc = function (data) {
            this.testingExtention.addListItemToPage('button clicked and was told:' + data);
        };
    //add our example methods - am using the event 'auto' to differentiate it from
    //any real event in the DOM.  Just for demontratino purposes, to show it needn't be a 'standard'
    //event e.g.click/load/hover event etc
    customEvt.addListener('auto', exampleCallBackFunc1);
    customEvt.addListener('auto', exampleCallBackFunc2);
    //call the notify method
    customEvt.notifyListeners('auto');
    //remove the test function
    customEvt.removeListener('auto', exampleCallBackFunc1);
    //call the notify method to check we've had no additional events
    customEvt.notifyListeners('auto');

    customEvt.addListener('button', buttonCallBackFunc);
    demoButton.addEventListener('click', function () {
        customEvt.notifyListeners('button');
    });
}
//cause the automatic code to run
window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    customEventTest();
}, false);