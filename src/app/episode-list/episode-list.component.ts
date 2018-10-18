import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IEpisode, IState } from "../state/state";
import { requestEpisodes } from "../state/actions";
import { getEpisodes } from "../state/selectors";

interface ISeason {
  id: string;
  episodes: IEpisode[];
}

export function groupBySeason(episodes: IEpisode[]): ISeason[] {
  const episodesBySeason: { [season: string]: IEpisode[] } = {};
  episodes.forEach((episode) => {
    const seasonId = episode.season;
    let items = episodesBySeason[seasonId];
    if (!items) {
      items = episodesBySeason[seasonId] = [];
    }
    items.push(episode);
  });
  return Object.keys(episodesBySeason).map((id) => ({
    id,
    episodes: episodesBySeason[id],
  }));
}

@Component({
  selector: "app-episode-list",
  templateUrl: "./episode-list.component.html",
  styleUrls: ["./episode-list.component.scss"],
})
export class EpisodeListComponent implements OnInit {
  @Input()
  showId: number | undefined;

  seasons: ISeason[] | undefined;

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    // TODO: handle showId changes
    this.store.dispatch(requestEpisodes(this.showId!));

    this.store.select((state) => getEpisodes(state, this.showId!)).subscribe((episodes) => {
      if (episodes) {
        this.seasons = groupBySeason(episodes);
      }
    });
  }

  trackBySeasonId(index: number, season: ISeason): string {
    return season.id;
  }

  trackByEpisodeId(index: number, episode: IEpisode): number {
    return episode.id;
  }
}
