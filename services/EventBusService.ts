import EventBusServiceInterface from "./EventBusServiceInterface";

export default class EventBusService implements EventBusServiceInterface {
    private events: { [key: string]: Function[] };

    constructor() {
        this.events = {};
    }

    dispatch(eventName: string, cmpId: string): void {
        if (this.events[eventName]) {
            for (const callback of this.events[eventName]) {
                callback(cmpId);
            }
        }
    }

    subscribe(eventName: string, callback: Function): void {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
}