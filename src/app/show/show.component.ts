import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IEpisode, IShow, IState } from "../state/state";
import { fetchShows, fetchEpisodes } from "../state/actions";
import { getParams, getSelectedShow, getSelectedEpisodes } from "../state/selectors";

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"],
})
export class ShowComponent {
  showId: number | undefined;
  show: IShow | undefined;
  episodes: IEpisode[] | undefined;

  constructor(private store: Store<IState>) {
    this.store.dispatch(fetchShows());

    this.store.pipe(select(getParams)).subscribe(({ showId }) => {
      if (showId && showId !== this.showId) {
        this.showId = showId;
        this.store.dispatch(fetchEpisodes(showId!));
      }
    });

    this.store.pipe(select(getSelectedShow)).subscribe((show) => {
      this.show = show;
    });

    this.store.pipe(select(getSelectedEpisodes)).subscribe((episodes) => {
      this.episodes = episodes;
    });
  }
}
