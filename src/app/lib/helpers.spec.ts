import { Component, Pipe } from "@angular/core";
import { Subject } from "rxjs";

/*
  How to use this?

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyCompontent],
      providers: [{ provide: Store, useValue: new MockStore() }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    store = TestBed.get(Store);
    store.next(MOCK_STATE);
    fixture.detectChanges();
  });

  NOTE: make sure you call store.next AFTER TestBed.createComponent and BEFORE fixture.detectChanges.
  NOTE: make sure you call fixture.detectChanges after each call of store.next.
*/

export class MockStore<State> extends Subject<State> {
  dispatch = jasmine.createSpy();
}

// see node_modules/@angular/core/src/util/decorators.d.ts for the names of the annotations properties

export interface IMockClass {
  (): void;
  __annotations__?: any[];
  __parameters__?: any;
  __prop__metadata__?: any;
}

export function copyMetadata(oldClass: IMockClass, newClass: IMockClass): void {
  if (oldClass.__parameters__) {
    newClass.__parameters__ = oldClass.__parameters__;
  }
  if (oldClass.__prop__metadata__) {
    newClass.__prop__metadata__ = oldClass.__prop__metadata__;
  }
}

export function createMockComponent(component: any): IMockClass {
  const oldComponent = component as IMockClass;

  const newComponent: IMockClass = () => {};

  const annotations = oldComponent.__annotations__;
  if (annotations && annotations.length === 1 && annotations[0] instanceof Component) {
    const componentAnnotation = annotations[0] as Component;
    componentAnnotation.template = "";
    delete componentAnnotation.templateUrl;
    newComponent.__annotations__ = [componentAnnotation];
  } else {
    throw new Error("is this a component class? cannot create mock component from: " + component);
  }
  copyMetadata(oldComponent, newComponent);
  return newComponent;
}

export function createMockPipe(pipe: any): IMockClass {
  const oldPipe = pipe as IMockClass;

  const newPipe: IMockClass = () => {};
  newPipe.prototype.transform = (...args: any[]): string => {
    return `${name}(${args.join(",")})`;
  };

  const annotations = oldPipe.__annotations__;
  let name = "";
  if (annotations && annotations.length === 1 && annotations[0] instanceof Pipe) {
    const pipeAnnotation = annotations[0] as Pipe;
    name = pipeAnnotation.name;
    newPipe.__annotations__ = [pipeAnnotation];
  } else {
    throw new Error("is this a pipe class? cannot create mock pipe from: " + pipe);
  }
  copyMetadata(oldPipe, newPipe);
  return newPipe;
}
