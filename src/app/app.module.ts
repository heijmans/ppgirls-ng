import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ShowListComponent } from "./show-list/show-list.component";
import { ShowComponent } from "./show/show.component";
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";
import { ShowTitlePipe } from "./pipes/show-title.pipe";
import { EpisodeListComponent } from "./episode-list/episode-list.component";
import { EpisodeComponent } from "./episode/episode.component";
import { routes } from "./routes";

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
