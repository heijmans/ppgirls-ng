import { Component, Input } from "@angular/core";
import { IEpisode } from "../state/state";

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
export class EpisodeListComponent {
  @Input()
  showId?: number;

  @Input()
  set episodes(episodes: IEpisode[] | undefined) {
    if (episodes) {
      this.seasons = groupBySeason(episodes);
    }
  }

  seasons?: ISeason[];

  constructor() {}

  trackBySeasonId(_: number, season: ISeason): string {
    return season.id;
  }

  trackByEpisodeId(_: number, episode: IEpisode): number {
    return episode.id;
  }
}
