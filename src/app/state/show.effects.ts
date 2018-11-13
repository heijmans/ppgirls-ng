import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, merge, of } from "rxjs";
import { filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import {
  AppAction,
  FETCH_SHOWS,
  FETCH_EPISODES,
  IFetchShowsAction,
  IFetchEpisodesAction,
  requestShows,
  requestEpisodes,
  receiveShows,
  receiveEpisodes,
} from "./actions";
import { ShowService } from "./show.service";
import { IState } from "./state";
import { getShows, getEpisodes } from "./selectors";

@Injectable()
export class ShowEffects {
  @Effect()
  receiveShows$: Observable<AppAction>;

  @Effect()
  receiveEpisodes$: Observable<AppAction>;

  constructor(
    private actions$: Actions,
    private store: Store<IState>,
    private showService: ShowService,
  ) {
    this.receiveShows$ = this.actions$.pipe(
      ofType<IFetchShowsAction>(FETCH_SHOWS),
      withLatestFrom(this.store),
      filter(([_, state]) => !getShows(state)),
      switchMap(() => merge(of(requestShows()), this.getShows())),
    );

    this.receiveEpisodes$ = this.actions$.pipe(
      ofType<IFetchEpisodesAction>(FETCH_EPISODES),
      withLatestFrom(this.store),
      filter(([{ showId }, state]) => !getEpisodes(state, showId)),
      switchMap(([{ showId }, _]) => merge(of(requestEpisodes(showId)), this.getEpisodes(showId))),
    );
  }

  getShows(): Observable<AppAction> {
    return this.showService.getShows().pipe(map((data) => receiveShows(data)));
  }

  getEpisodes(showId: number): Observable<AppAction> {
    return this.showService.getEpisodes(showId).pipe(map((data) => receiveEpisodes(showId, data)));
  }
}
