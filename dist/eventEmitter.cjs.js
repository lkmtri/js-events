'use strict';

function eventEmitter() {
  const list = new Map();
  const onceList = new Map();

  return {
    on(event, callback) {
      list.has(event) || list.set(event, []);
      list.get(event).push(callback);
      return this;
    },

    off(event, callback) {
      list.has(event) || list.set(event, []);
      list.set(event, list.get(event).filter(cb => cb !== callback));
      return this;
    },

    once(event, callback) {
      onceList.has(event) || onceList.set(event, []);
      onceList.get(event).push(callback);
      return this;
    },

    emit(event, ...args) {
      if (!list.has(event) && !onceList.has(event)) return false;

      if (list.has(event)) {
        for (const callback of list.get(event)) {
          setTimeout(() => callback.call(this, ...args), 0);
        }
      }

      if (onceList.has(event)) {
        for (const callback of onceList.get(event)) {
          setTimeout(() => callback.call(this, ...args), 0);
        }
        onceList.delete(event);
      }
      return true;
    }
  };
}

module.exports = eventEmitter;
