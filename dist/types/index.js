function eventEmitter() {
    var list = new Map();
    var onceList = new Map();
    var ensure = function (map, event) {
        if (!map.has(event)) {
            map.set(event, []);
        }
    };
    var self = {
        on: function (event, callback) {
            ensure(list, event);
            list.get(event).push(callback);
            return self;
        },
        off: function (event, callback) {
            ensure(list, event);
            list.set(event, list.get(event).filter(function (cb) { return cb !== callback; }));
            return self;
        },
        once: function (event, callback) {
            ensure(onceList, event);
            onceList.get(event).push(callback);
            return self;
        },
        emit: function (event, args) {
            if (!list.has(event) && !onceList.has(event))
                return self;
            if (list.has(event)) {
                var _loop_1 = function (callback) {
                    setTimeout(function () { return callback.call(self, args); }, 0);
                };
                for (var _i = 0, _a = list.get(event); _i < _a.length; _i++) {
                    var callback = _a[_i];
                    _loop_1(callback);
                }
            }
            if (onceList.has(event)) {
                var _loop_2 = function (callback) {
                    setTimeout(function () { return callback.call(self, args); }, 0);
                };
                for (var _b = 0, _c = onceList.get(event); _b < _c.length; _b++) {
                    var callback = _c[_b];
                    _loop_2(callback);
                }
                onceList["delete"](event);
            }
            return self;
        }
    };
    return self;
}

export default eventEmitter;
