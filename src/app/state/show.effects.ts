import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import { filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import {
  REQUEST_SHOWS,
  REQUEST_EPISODES,
  receiveShows,
  receiveEpisodes,
  IRequestEpisodesAction,
  IRequestShowsAction,
} from "./actions";
import { ShowService } from "./show.service";
import { IState } from "./state";
import { getShows, getEpisodes } from "./selectors";

function fetchShows(showService: ShowService) {
  return showService.getShows().pipe(map((data) => receiveShows(data)));
}

function fetchEpisodes(showService: ShowService, showId: number) {
  return showService.getEpisodes(showId).pipe(map((data) => receiveEpisodes(showId, data)));
}

@Injectable()
export class ShowEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IState>,
    private showService: ShowService,
  ) {}

  @Effect()
  receiveShows$ = this.actions$
    .ofType<IRequestShowsAction>(REQUEST_SHOWS)
    .pipe(withLatestFrom(this.store))
    .pipe(filter(([_, state]) => !getShows(state)))
    .pipe(switchMap(() => fetchShows(this.showService)));

  @Effect()
  receiveEpisodes$ = this.actions$
    .ofType<IRequestEpisodesAction>(REQUEST_EPISODES)
    .pipe(withLatestFrom(this.store))
    .pipe(filter(([{ showId }, state]) => !getEpisodes(showId)(state)))
    .pipe(switchMap(([{ showId }, _]) => fetchEpisodes(this.showService, showId)));
}
