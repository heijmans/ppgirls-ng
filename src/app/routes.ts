import { Routes } from "@angular/router";
import { ShowListComponent } from "./show-list/show-list.component";
import { ShowComponent } from "./show/show.component";
import { EpisodeComponent } from "./episode/episode.component";

export const routes: Routes = [
  { path: "", component: ShowListComponent },
  { path: "shows/:showId", component: ShowComponent },
  { path: "shows/:showId/episodes/:episodeId", component: EpisodeComponent },
];
