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
