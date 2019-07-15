import { OnModuleDestroy, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CommandBus } from './command-bus';
import { IEventPublisher } from './interfaces/events/event-publisher.interface';
import { IEvent, IEventBus, IEventHandler, ISaga } from './interfaces/index';
import { ObservableBus } from './utils/observable-bus';
export declare type EventHandlerType = Type<IEventHandler<IEvent>>;
export declare class EventBus extends ObservableBus<IEvent>
  implements IEventBus, OnModuleDestroy {
  private readonly commandBus;
  private readonly moduleRef;
  private _publisher;
  private readonly subscriptions;
  constructor(commandBus: CommandBus, moduleRef: ModuleRef);
  publisher: IEventPublisher;
  onModuleDestroy(): void;
  publish<T extends IEvent>(event: T): void;
  publishAll(events: IEvent[]): void;
  bind(handler: IEventHandler<IEvent>, name: string): void;
  registerSagas(types?: Type<any>[]): void;
  register(handlers?: EventHandlerType[]): void;
  protected registerHandler(handler: EventHandlerType): void;
  protected ofEventName(name: string): Observable<IEvent>;
  private getEventName;
  protected registerSaga(saga: ISaga): void;
  private reflectEventsNames;
  private useDefaultPublisher;
}
