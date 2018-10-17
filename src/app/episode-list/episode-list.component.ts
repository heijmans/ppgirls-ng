import { Component, Input, OnInit } from '@angular/core';
import { IEpisode } from '../state/state';

const NO_IMAGE_URL = 'https://static.tvmaze.com/images/no-img/no-img-landscape-text.png';
const MISSING_IMAGE = { medium: NO_IMAGE_URL, original: NO_IMAGE_URL };

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
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  @Input() showId: number;

  episodes: IEpisode[] = [
    {
      id: 5,
      name: 'PP1',
      image: MISSING_IMAGE,
      season: 1,
      number: 2,
    },
    {
      id: 7,
      name: 'PP2',
      image: MISSING_IMAGE,
      season: 1,
      number: 3,
    },
    {
      id: 8,
      name: 'PP2',
      image: MISSING_IMAGE,
      season: 2,
      number: 1,
    },
  ];

  seasons: ISeason[] | undefined;

  constructor() { }

  ngOnInit() {
    this.seasons = groupBySeason(this.episodes);
  }

  trackBySeasonId(index: number, season: ISeason): string {
    return season.id;
  }

  trackByEpisodeId(index: number, episode: IEpisode): number {
    return episode.id;
  }

}
