import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { switchMap, tap } from "rxjs/operators";
import { IEpisode, IShow, IState } from "../state/state";
import { requestShows, requestEpisodes } from "../state/actions";
import { getShow, getEpisode } from "../state/selectors";

@Component({
  selector: "app-episode",
  templateUrl: "./episode.component.html",
  styleUrls: ["./episode.component.scss"],
})
export class EpisodeComponent {
  showId: number | undefined;
  episodeId: number | undefined;

  show: IShow | undefined;
  episode: IEpisode | undefined;

  constructor(private route: ActivatedRoute, private store: Store<IState>) {
    this.store.dispatch(requestShows());

    const param$ = this.route.paramMap.pipe(
      tap((params) => {
        this.showId = parseInt(params.get("showId") || "0", 10);
        this.episodeId = parseInt(params.get("episodeId") || "0", 10);
        this.store.dispatch(requestEpisodes(this.showId));
      }),
    );
    param$
      .pipe(switchMap(() => this.store.pipe(select((state) => getShow(state, this.showId!)))))
      .subscribe((show) => {
        this.show = show;
      });
    param$
      .pipe(
        switchMap(() =>
          this.store.pipe(select((state) => getEpisode(state, this.showId!, this.episodeId!))),
        ),
      )
      .subscribe((episode) => {
        this.episode = episode;
      });
  }
}
