import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { switchMap, tap } from "rxjs/operators";
import { IEpisode, IShow, IState } from "../state/state";
import { requestShows, requestEpisodes } from "../state/actions";
import { getShow, getEpisode } from "../state/selectors";

const NO_IMAGE_URL = "https://static.tvmaze.com/images/no-img/no-img-landscape-text.png";
const MISSING_IMAGE = { medium: NO_IMAGE_URL, original: NO_IMAGE_URL };

@Component({
  selector: "app-episode",
  templateUrl: "./episode.component.html",
  styleUrls: ["./episode.component.scss"],
})
export class EpisodeComponent implements OnInit {
  showId: number | undefined;
  episodeId: number | undefined;

  show: IShow | undefined;
  episode: IEpisode | undefined;

  constructor(private route: ActivatedRoute, private store: Store<IState>) {}

  ngOnInit() {
    this.store.dispatch(requestShows());

    const param$ = this.route.paramMap.pipe(
      tap((params) => {
        this.showId = parseInt(params.get("showId") || "0", 10);
        this.episodeId = parseInt(params.get("episodeId") || "0", 10);
        this.store.dispatch(requestEpisodes(this.showId));
      }),
    );
    param$
      .pipe(switchMap(() => this.store.select((state) => getShow(state, this.showId!))))
      .subscribe((show) => {
        this.show = show;
      });
    param$
      .pipe(
        switchMap(() =>
          this.store.select((state) => getEpisode(state, this.showId!, this.episodeId!)),
        ),
      )
      .subscribe((episode) => {
        this.episode = episode;
      });
  }
}
