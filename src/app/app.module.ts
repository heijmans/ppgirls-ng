import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { AppComponent } from "./app.component";
import { ShowListComponent } from "./show-list/show-list.component";
import { ShowComponent } from "./show/show.component";
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";
import { ShowTitlePipe } from "./pipes/show-title.pipe";
import { EpisodeListComponent } from "./episode-list/episode-list.component";
import { EpisodeComponent } from "./episode/episode.component";
import { routes } from "./routes";
import { reducers } from "./state/reducers";
import { ShowEffects } from "./state/show.effects";
import { INITIAL_STATE } from "./state/state";

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    ShowListComponent,
    ShowComponent,
    ShowTitlePipe,
    EpisodeListComponent,
    EpisodeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot(reducers, { initialState: INITIAL_STATE }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([ShowEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
