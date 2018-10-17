import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IShow, IState } from "../state/state";
import { getShows } from "../state/selectors";
import { requestShows } from "../state/actions";

@Component({
  selector: "app-show-list",
  templateUrl: "./show-list.component.html",
  styleUrls: ["./show-list.component.scss"],
})
export class ShowListComponent implements OnInit {
  shows: IShow[] | undefined;

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.store.dispatch(requestShows());

    this.store.select(getShows).subscribe((shows) => {
      this.shows = shows;
    });
  }

  trackByShowId(_: number, show: IShow): number {
    return show.id;
  }
}
