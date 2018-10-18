import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { tap, switchMap } from "rxjs/operators";
import { IShow, IState } from "../state/state";
import { requestShows } from "../state/actions";
import { getShow } from "../state/selectors";

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"],
})
export class ShowComponent implements OnInit {
  showId: number | undefined;

  show: IShow | undefined;

  constructor(private route: ActivatedRoute, private store: Store<IState>) {}

  ngOnInit() {
    this.store.dispatch(requestShows());

    this.route.paramMap
      .pipe(
        tap((params) => {
          this.showId = parseInt(params.get("showId") || "0", 10);
        }),
      )
      .pipe(switchMap(() => this.store.select((state) => getShow(state, this.showId!))))
      .subscribe((show) => {
        this.show = show;
      });
  }
}
