function eventEmitter() {
    var list = new Map();
    var onceList = new Map();
    var ensure = function (map, event) {
        if (!map.has(event)) {
            map.set(event, []);
        }
    };
    return {
        on: function (event, callback) {
            ensure(list, event);
            list.get(event).push(callback);
            return this;
        },
        off: function (event, callback) {
            ensure(list, event);
            list.set(event, list.get(event).filter(function (cb) { return cb !== callback; }));
            return this;
        },
        once: function (event, callback) {
            ensure(onceList, event);
            onceList.get(event).push(callback);
            return this;
        },
        emit: function (event, args) {
            var _this = this;
            if (!list.has(event) && !onceList.has(event))
                return false;
            if (list.has(event)) {
                var _loop_1 = function (callback) {
                    setTimeout(function () { return callback.call(_this, args); }, 0);
                };
                for (var _i = 0, _a = list.get(event); _i < _a.length; _i++) {
                    var callback = _a[_i];
                    _loop_1(callback);
                }
            }
            if (onceList.has(event)) {
                var _loop_2 = function (callback) {
                    setTimeout(function () { return callback.call(_this, args); }, 0);
                };
                for (var _b = 0, _c = onceList.get(event); _b < _c.length; _b++) {
                    var callback = _c[_b];
                    _loop_2(callback);
                }
                onceList["delete"](event);
            }
            return true;
        }
    };
}

export default eventEmitter;
