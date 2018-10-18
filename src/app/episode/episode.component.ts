import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IEpisode, IShow, IState } from "../state/state";
import { requestShows, requestEpisodes } from "../state/actions";
import { getParams, getSelectedShow, getSelectedEpisode } from "../state/selectors";

@Component({
  selector: "app-episode",
  templateUrl: "./episode.component.html",
  styleUrls: ["./episode.component.scss"],
})
export class EpisodeComponent {
  showId: number | undefined;
  show: IShow | undefined;
  episode: IEpisode | undefined;

  constructor(private store: Store<IState>) {
    this.store.dispatch(requestShows());

    this.store.pipe(select(getParams)).subscribe(({ showId }) => {
      if (showId && showId !== this.showId) {
        this.showId = showId;
        this.store.dispatch(requestEpisodes(showId!));
      }
    });

    this.store.pipe(select(getSelectedShow)).subscribe((show) => {
      this.show = show;
    });

    this.store.pipe(select(getSelectedEpisode)).subscribe((episode) => {
      this.episode = episode;
    });
  }
}
