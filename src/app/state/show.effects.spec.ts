import { async } from "@angular/core/testing";
import { of, Subject } from "rxjs";
import { MockStore, toActions, toStore } from "../lib/helpers.test";
import {
  AppAction,
  FETCH_EPISODES,
  FETCH_SHOWS,
  RECEIVE_EPISODES,
  RECEIVE_SHOWS,
  REQUEST_EPISODES,
  REQUEST_SHOWS,
} from "./actions";
import { ShowEffects } from "./show.effects";
import { ShowService } from "./show.service";
import { IState } from "./state";
import { MOCK_EMPTY_STATE, MOCK_EPISODES, MOCK_SHOW } from "./state.mock";

describe("ShowEffects", () => {
  let actions$: Subject<AppAction>;
  let store: MockStore<IState>;
  let showService: jasmine.SpyObj<ShowService>;
  let showEffect: ShowEffects;

  beforeEach(() => {
    actions$ = new Subject<AppAction>();
    store = new MockStore(MOCK_EMPTY_STATE);
    showService = jasmine.createSpyObj<ShowService>("showService", ["getShows", "getEpisodes"]);
    showEffect = new ShowEffects(toActions(actions$), toStore(store), showService);
  });

  it("should handle fetch shows", () => {
    const actions: AppAction[] = [
      { type: REQUEST_SHOWS },
      { type: RECEIVE_SHOWS, data: [MOCK_SHOW] },
    ];

    showService.getShows.and.returnValue(of([MOCK_SHOW]));
    showEffect.receiveShows$.subscribe(
      (shows) => {
        expect(shows).toEqual(actions.shift()!);
      },
      undefined,
      () => {
        expect(actions).toEqual([]);
      },
    );
    actions$.next({ type: FETCH_SHOWS });
    actions$.complete();
  });

  it("should handle receive shows", async(() => {
    const actions: AppAction[] = [
      { type: REQUEST_EPISODES, showId: 12 },
      { type: RECEIVE_EPISODES, showId: 12, data: MOCK_EPISODES },
    ];

    showService.getEpisodes.and.returnValue(of(MOCK_EPISODES));
    showEffect.receiveEpisodes$.subscribe(
      (shows) => {
        expect(shows).toEqual(actions.shift()!);
      },
      undefined,
      () => {
        expect(actions).toEqual([]);
      },
    );
    actions$.next({ type: FETCH_EPISODES, showId: 12 });
    actions$.complete();
  }));
});
