import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions } from "@ngrx/effects";
import { IState } from "./state/state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "ppgirls-ng";

  constructor(actions$: Actions, store: Store<IState>) {
    /*
    actions$.subscribe((action) => {
      console.log(action);
    });
    store.subscribe((state) => {
      console.log(state);
    });
    */
  }
}
