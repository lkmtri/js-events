type CallbackFn<Args = any> = (payload: Args) => void;

function eventEmitter<EventType extends Record<string, unknown>>() {
  const list = new Map<keyof EventType, CallbackFn[]>();
  const onceList = new Map<keyof EventType, CallbackFn[]>();

  const ensure = (
    map: Map<keyof EventType, CallbackFn[]>,
    event: keyof EventType
  ) => {
    if (!map.has(event)) {
      map.set(event, []);
    }
  };

  const self = {
    on<T extends keyof EventType>(
      event: T,
      callback: CallbackFn<EventType[T]>
    ) {
      ensure(list, event);
      list.get(event)!.push(callback);
      return self;
    },

    off<T extends keyof EventType>(
      event: T,
      callback: CallbackFn<EventType[T]>
    ) {
      ensure(list, event);
      list.set(
        event,
        list.get(event)!.filter((cb) => cb !== callback)
      );
      return self;
    },

    once<T extends keyof EventType>(
      event: T,
      callback: CallbackFn<EventType[T]>
    ) {
      ensure(onceList, event);
      onceList.get(event)!.push(callback);
      return self;
    },

    emit<T extends keyof EventType>(event: T, args: EventType[T]) {
      if (!list.has(event) && !onceList.has(event)) return self;

      if (list.has(event)) {
        for (const callback of list.get(event)!) {
          setTimeout(() => callback.call(self, args), 0);
        }
      }

      if (onceList.has(event)) {
        for (const callback of onceList.get(event)!) {
          setTimeout(() => callback.call(self, args), 0);
        }
        onceList.delete(event);
      }

      return self;
    },
  }

  return self;
}

export default eventEmitter;
