import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { makeSubscriptionList } from "../lib/subscription-list";
import { IEpisode, IShow, IState } from "../state/state";
import { fetchShows, fetchEpisodes } from "../state/actions";
import { getParams, getSelectedShow, getSelectedEpisode } from "../state/selectors";

@Component({
  selector: "app-episode",
  templateUrl: "./episode.component.html",
  styleUrls: ["./episode.component.scss"],
})
export class EpisodeComponent implements OnInit, OnDestroy {
  showId?: number;
  show?: IShow;
  episode?: IEpisode;

  subscriptions = makeSubscriptionList();

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    this.store.dispatch(fetchShows());

    this.subscriptions.add(
      this.store.pipe(select(getParams)).subscribe(({ showId }) => {
        if (showId && showId !== this.showId) {
          this.showId = showId;
          this.store.dispatch(fetchEpisodes(showId!));
        }
      }),
    );

    this.subscriptions.add(
      this.store.pipe(select(getSelectedShow)).subscribe((show) => {
        this.show = show;
      }),
    );

    this.subscriptions.add(
      this.store.pipe(select(getSelectedEpisode)).subscribe((episode) => {
        this.episode = episode;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribeAll();
  }
}
