import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { tap, switchMap } from "rxjs/operators";
import { IEpisode, IShow, IState } from "../state/state";
import { requestShows, requestEpisodes } from "../state/actions";
import { getShow, getEpisodes } from "../state/selectors";

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"],
})
export class ShowComponent {
  showId: number | undefined;

  show: IShow | undefined;

  episodes: IEpisode[] | undefined;

  constructor(private route: ActivatedRoute, private store: Store<IState>) {
    this.store.dispatch(requestShows());
    const params$ = this.route.paramMap.pipe(
      tap((params) => {
        this.showId = parseInt(params.get("showId") || "0", 10);
        this.store.dispatch(requestEpisodes(this.showId));
      }),
    );

    params$
      .pipe(switchMap(() => this.store.pipe(select((state) => getShow(state, this.showId!)))))
      .subscribe((show) => {
        this.show = show;
      });

    params$
      .pipe(switchMap(() => this.store.pipe(select((state) => getEpisodes(state, this.showId!)))))
      .subscribe((episodes) => {
        this.episodes = episodes;
      });
  }
}
