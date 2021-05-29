function eventEmitter() {
  const list = new Map();
  const onceList = new Map();
  const ensure = (map, event) => {
    if (!map.has(event)) {
      map.set(event, []);
    }
  };
  const self = {
    on(event, callback) {
      ensure(list, event);
      list.get(event).push(callback);
      return self;
    },
    off(event, callback) {
      ensure(list, event);
      list.set(event, list.get(event).filter((cb) => cb !== callback));
      return self;
    },
    once(event, callback) {
      ensure(onceList, event);
      onceList.get(event).push(callback);
      return self;
    },
    emit(event, args) {
      if (!list.has(event) && !onceList.has(event))
        return self;
      if (list.has(event)) {
        for (const callback of list.get(event)) {
          setTimeout(() => callback.call(self, args), 0);
        }
      }
      if (onceList.has(event)) {
        for (const callback of onceList.get(event)) {
          setTimeout(() => callback.call(self, args), 0);
        }
        onceList.delete(event);
      }
      return self;
    }
  };
  return self;
}

export default eventEmitter;
