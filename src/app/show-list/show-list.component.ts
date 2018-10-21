import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IShow, IState } from "../state/state";
import { getShows } from "../state/selectors";
import { fetchShows } from "../state/actions";

@Component({
  selector: "app-show-list",
  templateUrl: "./show-list.component.html",
  styleUrls: ["./show-list.component.scss"],
})
export class ShowListComponent {
  shows?: IShow[];

  constructor(private store: Store<IState>) {
    this.store.dispatch(fetchShows());
    this.store.pipe(select(getShows)).subscribe((shows) => {
      this.shows = shows;
    });
  }

  trackByShowId(_: number, show: IShow): number {
    return show.id;
  }
}
