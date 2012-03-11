function CustomEventsController() {
    this._listeners = {};
    //aka listen / subscribe / observe
    this.addListener = function (eventType, callBackFunc) {
        if (!this._listeners[eventType]) {
            this._listeners[eventType] = [callBackFunc];
        } else {
            this._listeners[eventType].push(callBackFunc);
        }
    };
    //aka unlisten / unsubscribe / unobserve
    this.removeListener = function (eventType, callBackFunc) {
        var j, callBacks;
        //find the matching callback and remove it
        callBacks = this._listeners[eventType];
        for (j = 0; j < callBacks.length; j++) {
            if (callBacks[j] === callBackFunc) {
                callBacks = callBacks.splice(j, 1);
            }
        }
    };
    //aka broadcast / fire
    this.notifyListeners = function (eventType) {
        var i, callBacks;
        //for each of the listeners execute their callback
        callBacks = this._listeners[eventType];
        for (i = 0; i < callBacks.length; i++) {
            callBacks[i].apply(this, ['this callback was held at position: ' + i]);
        }
    };

    //clean up this object
    this.destroy = function () {
        var eventType, i;
        for (eventType in this._listeners) {
            if (this._listeners.hasOwnProperty(eventType)) {
                delete this._listeners[eventType];
            }
        }
        //according to mdn this will work, but perhaps needs more testing / investigation
        //to ensure that it does in IE
        delete this._listeners;
    };
}