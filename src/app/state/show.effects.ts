import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import {
  AppAction,
  IRequestShowsAction,
  IRequestEpisodesAction,
  REQUEST_SHOWS,
  REQUEST_EPISODES,
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
    this.receiveShows$ = this.actions$.ofType<IRequestShowsAction>(REQUEST_SHOWS).pipe(
      withLatestFrom(this.store),
      filter(([_, state]) => !getShows(state)),
      switchMap(() => this.fetchShows()),
    );

    this.receiveEpisodes$ = this.actions$.ofType<IRequestEpisodesAction>(REQUEST_EPISODES).pipe(
      withLatestFrom(this.store),
      filter(([{ showId }, state]) => !getEpisodes(showId)(state)),
      switchMap(([{ showId }, _]) => this.fetchEpisodes(showId)),
    );
  }

  fetchShows() {
    return this.showService.getShows().pipe(map((data) => receiveShows(data)));
  }

  fetchEpisodes(showId: number) {
    return this.showService.getEpisodes(showId).pipe(map((data) => receiveEpisodes(showId, data)));
  }
}
