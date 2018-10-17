import { IEpisode, IShow, IState } from "./state";

export const getShows = (state: IState): IShow[] | undefined => {
  const { shows } = state;
  return !shows.isFetching ? shows.data : undefined;
};

export const getShow = (showId: number) => (state: IState): IShow | undefined => {
  const shows = getShows(state);
  return shows && shows.find((show) => show.id === showId);
};

export const getEpisodes = (showId: number) => (state: IState): IEpisode[] | undefined => {
  const episodes = state.episodesByShowId[showId];
  return episodes && !episodes.isFetching ? episodes.data : undefined;
};

export const getEpisode = (showId: number, episodeId: number) => (
  state: IState,
): IEpisode | undefined => {
  const episodes = getEpisodes(showId)(state);
  return episodes && episodes.find((episode) => episode.id === episodeId);
};
