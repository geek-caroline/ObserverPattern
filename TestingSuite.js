function TestingSuite() {
    this.executionNumber = 0;

    this.initNewNotifySection = function (eventType) {
        this.executionNumber++;
        this.addTitleToPage(eventType);
        this.addListToPage(eventType);
    };

    this._getPageOutputElem = function (eventType) {
        var elemId = eventType === 'auto' ? "auto-demo-output" : "button-demo-output",
            pageOutputElem = document.getElementById(elemId);
        return pageOutputElem;
    };

    this.addTitleToPage = function (eventType) {
        var txtElem = document.createTextNode('Notify listeners executionNumber: ' + this.executionNumber),
            titleElem = document.createElement('h2');
        titleElem.appendChild(txtElem);
        this._getPageOutputElem(eventType).appendChild(titleElem);
    };

    this.addListToPage = function (eventType) {
        var newList = document.createElement('ul');
        newList.className = "demo-list";
        newList.id = 'list-' + this.executionNumber;
        this._getPageOutputElem(eventType).appendChild(newList);
    };

    this.getListItem = function (txt) {
        var newListItem = document.createElement('li'),
            newTxtElememt = document.createTextNode(txt);
        newListItem.className = 'single-output';
        newListItem.appendChild(newTxtElememt);
        return newListItem;
    };

    this.addListItemToPage = function (textToAdd) {
        var pageOutputElem = document.getElementById('list-' + this.executionNumber),
            newOutput = this.getListItem(textToAdd);
        pageOutputElem.appendChild(newOutput);
    };

}