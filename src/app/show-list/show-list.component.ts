import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { makeSubscriptionList } from "../lib/subscription-list";
import { IShow, IState } from "../state/state";
import { getShows } from "../state/selectors";
import { fetchShows } from "../state/actions";

@Component({
  selector: "app-show-list",
  templateUrl: "./show-list.component.html",
  styleUrls: ["./show-list.component.scss"],
})
export class ShowListComponent implements OnInit, OnDestroy {
  shows?: IShow[];

  subscriptions = makeSubscriptionList();

  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    this.store.dispatch(fetchShows());
    this.subscriptions.add(
      this.store.pipe(select(getShows)).subscribe((shows) => {
        this.shows = shows;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribeAll();
  }

  trackByShowId(_: number, show: IShow): number {
    return show.id;
  }
}
