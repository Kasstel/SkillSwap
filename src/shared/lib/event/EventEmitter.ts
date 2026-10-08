import EventEmitter from "eventemitter3"; // Or 'events' from Node.js if using a bundler like Webpack
import type { UserInLocalStorage } from "@entities/User/types";
import { EventType } from "./EventType";

export type EventPayloadMap = {
  [EventType.updateUser]: UserInLocalStorage | null;
  [EventType.updateLikedUser]: string[];
};

export type EventCallback<K extends EventType> = (
  payload: EventPayloadMap[K],
) => void;

class EventEmitterWrapperClass {
  private _eventEmiiter: EventEmitter;
  constructor() {
    this._eventEmiiter = new EventEmitter();
  }

  subcribeUserUpdate(cb: EventCallback<typeof EventType.updateUser>) {
    this.subscribe(EventType.updateUser, cb);
  }

  unsubcribeUserUpdate(cb: EventCallback<typeof EventType.updateUser>) {
    this.unsubscribe(EventType.updateUser, cb);
  }

  subcribeLikedUserUpdate(cb: EventCallback<typeof EventType.updateLikedUser>) {
    this.subscribe(EventType.updateLikedUser, cb);
  }

  unsubcribeLikedUserUpdate(
    cb: EventCallback<typeof EventType.updateLikedUser>,
  ) {
    this.unsubscribe(EventType.updateLikedUser, cb);
  }

  subscribe<K extends EventType>(event: K, cb: EventCallback<K>) {
    this._eventEmiiter.addListener(event, cb);
  }

  unsubscribe<K extends EventType>(event: K, cb: EventCallback<K>) {
    this._eventEmiiter.removeListener(event, cb);
  }

  publish<K extends EventType>(event: K, data: EventPayloadMap[K]) {
    this._eventEmiiter.emit(event, data);
  }
}

export const EventEmitterWrapper = new EventEmitterWrapperClass();
