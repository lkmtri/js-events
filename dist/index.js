'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function eventEmitter() {
  var list = new Map();
  var onceList = new Map();

  var ensure = function ensure(map, event) {
    if (!map.has(event)) {
      map.set(event, []);
    }
  };

  return {
    on: function on(event, callback) {
      ensure(list, event);
      list.get(event).push(callback);
      return this;
    },
    off: function off(event, callback) {
      ensure(list, event);
      list.set(event, list.get(event).filter(function (cb) {
        return cb !== callback;
      }));
      return this;
    },
    once: function once(event, callback) {
      ensure(onceList, event);
      onceList.get(event).push(callback);
      return this;
    },
    emit: function emit(event, args) {
      var _this = this;

      if (!list.has(event) && !onceList.has(event)) return false;

      if (list.has(event)) {
        var _iterator = _createForOfIteratorHelper(list.get(event)),
            _step;

        try {
          var _loop = function _loop() {
            var callback = _step.value;
            setTimeout(function () {
              return callback.call(_this, args);
            }, 0);
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (onceList.has(event)) {
        var _iterator2 = _createForOfIteratorHelper(onceList.get(event)),
            _step2;

        try {
          var _loop2 = function _loop2() {
            var callback = _step2.value;
            setTimeout(function () {
              return callback.call(_this, args);
            }, 0);
          };

          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        onceList["delete"](event);
      }

      return true;
    }
  };
}

exports.default = eventEmitter;
