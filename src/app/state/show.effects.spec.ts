import { async } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { of, Subject } from "rxjs";
import { MockStore } from "../lib/helpers.test";
import { AppAction, FETCH_SHOWS, RECEIVE_SHOWS, REQUEST_SHOWS } from "./actions";
import { ShowEffects } from "./show.effects";
import { ShowService } from "./show.service";
import { IState } from "./state";
import { MOCK_EMPTY_STATE, MOCK_SHOW } from "./state.mock";

function toActions<A extends Action>(actions$: Subject<A>): Actions<A> {
  return (actions$ as any) as Actions<A>;
}

function toStore<S>(store: MockStore<S>): Store<S> {
  return (store as any) as Store<S>;
}

describe("ShowEffects", () => {
  let actions$: Subject<AppAction>;
  let store: MockStore<IState>;
  let showService: jasmine.SpyObj<ShowService>;
  let showEffect: ShowEffects;

  beforeEach(async(() => {
    actions$ = new Subject<AppAction>();
    store = new MockStore();
    showService = jasmine.createSpyObj<ShowService>("showService", ["getShows", "getEpisodes"]);
    showEffect = new ShowEffects(toActions(actions$), toStore(store), showService);
  }));

  it("should handle fetch shows", async(() => {
    showService.getShows.and.returnValue(of([MOCK_SHOW]));
    const actions: AppAction[] = [
      { type: REQUEST_SHOWS },
      { type: RECEIVE_SHOWS, data: [MOCK_SHOW] },
    ];
    showEffect.receiveShows$.subscribe(
      (shows) => {
        expect(shows).toEqual(actions.shift()!);
      },
      undefined,
      () => {
        expect(actions).toEqual([]);
      },
    );
    store.next(MOCK_EMPTY_STATE);
    actions$.next({ type: FETCH_SHOWS });
    actions$.complete();
  }));
});
