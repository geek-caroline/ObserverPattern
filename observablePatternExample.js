function CustomEventsController() {
    this._listeners = {};
    this.testingExtention = new TestingExtentions();
    //aka listen / subscribe / observe
    this.addListener = function (eventType, callBackFunc) {
        if (!this._listeners[eventType]) {
            this._listeners[eventType] = [];
        }
        this._listeners[eventType].push(callBackFunc);
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
        this.testingExtention.incrementCounter();
        this.testingExtention.addTitleToPage(eventType);
        this.testingExtention.addListToPage(eventType);
        callBacks = this._listeners[eventType];
        for (i = 0; i < callBacks.length; i++) {
            callBacks[i].apply(this, ['this callback was held at position: ' + i]);
        }
    };
}

function TestingExtentions() {
    this.executionNumber = 0;
    return this;
}
TestingExtentions.prototype = {
    incrementCounter: function () {
        this.executionNumber++;
    },
    _getPageOutputElem: function (eventType) {
        var elemId = eventType === 'auto' ? "auto-demo-output" : "button-demo-output",
            pageOutputElem = document.getElementById(elemId);
        return pageOutputElem;
    },
    addTitleToPage: function (eventType) {
        var txtElem = document.createTextNode('Notify listeners executionNumber: ' + this.executionNumber),
            titleElem = document.createElement('h2');
        titleElem.appendChild(txtElem);
        this._getPageOutputElem(eventType).appendChild(titleElem);
    },
    addListToPage: function (eventType) {
        var newList = document.createElement('ul');
        newList.className = "demo-list";
        newList.id = 'list-' + this.executionNumber;
        this._getPageOutputElem(eventType).appendChild(newList);
    },
    getListItem: function (txt) {
        var newListItem = document.createElement('li'),
            newTxtElememt = document.createTextNode(txt);
        newListItem.className = 'single-output';
        newListItem.appendChild(newTxtElememt);
        return newListItem;
    },
    addListItemToPage: function (textToAdd) {
        var pageOutputElem = document.getElementById('list-' + this.executionNumber),
            newOutput = this.getListItem(textToAdd);
        pageOutputElem.appendChild(newOutput);
    }
};