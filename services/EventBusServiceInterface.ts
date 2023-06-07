export default interface EventBusServiceInterface {
    dispatch(eventName: string, cmpId: string): void;
    subscribe(eventName: string, callback: Function): void;
}