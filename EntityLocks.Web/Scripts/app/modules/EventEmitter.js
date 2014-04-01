define(['app/common/enums'], function (Enums) {

    var events = {};

    // Class for handling global events
    // We cannot use jQuery as we operationg on our own objects
    function EventEmitter() {

    }

    EventEmitter.prototype.bind = function (event, handler) {
        if (!events[event]) {
            events[event] = [];
        }

        events[event].push(handler);
    };

    EventEmitter.prototype.emit = function (event, arg) {
        if (events.hasOwnProperty(event)) {
            for (var i = 0, l = events[event].length; i < l; ++i) {
                // assume that function is alredy bound to context
                events[event][i](arg);
            }
        }
    };

    var instance = new EventEmitter();
    return instance;
})