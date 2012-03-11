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
        //find the matching callback and remove it
        for (var j = 0; j < this._listeners.length; j++) {
            if (this._listeners[j] === callBackFunc) {
                this._listeners = this._listeners.splice(j, 1);
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
}