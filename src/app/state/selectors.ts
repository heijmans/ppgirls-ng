import { IEpisode, IShow, IState } from "./state";

export function getShows(state: IState): IShow[] | undefined {
  const { shows } = state;
  return !shows.isFetching ? shows.data : undefined;
}

export function getShow(state: IState, showId: number): IShow | undefined {
  const shows = getShows(state);
  return shows && shows.find((show) => show.id === showId);
}

export function getEpisodes(state: IState, showId: number): IEpisode[] | undefined {
  const episodes = state.episodesByShowId[showId];
  return episodes && !episodes.isFetching ? episodes.data : undefined;
}

export function getEpisode(state: IState, showId: number, episodeId: number): IEpisode | undefined {
  const episodes = getEpisodes(state, showId);
  return episodes && episodes.find((episode) => episode.id === episodeId);
}
