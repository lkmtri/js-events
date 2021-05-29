declare type CallbackFn<Args = any> = (payload: Args) => void;
declare function eventEmitter<EventType extends Record<string, unknown>>(): {
    on<T extends keyof EventType>(event: T, callback: CallbackFn<EventType[T]>): any;
    off<T_1 extends keyof EventType>(event: T_1, callback: CallbackFn<EventType[T_1]>): any;
    once<T_2 extends keyof EventType>(event: T_2, callback: CallbackFn<EventType[T_2]>): any;
    emit<T_3 extends keyof EventType>(event: T_3, args: EventType[T_3]): boolean;
};
export default eventEmitter;
