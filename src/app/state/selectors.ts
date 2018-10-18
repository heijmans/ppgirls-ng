import { IEpisode, IShow, IState, IParams } from "./state";

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

export interface IAppParams {
  showId?: number;
  episodeId?: number;
}

export function getParams(state: IState): IAppParams {
  const { router } = state;
  if (!router) {
    return {};
  }
  const params = router.state.params;
  const { showId, episodeId } = params;
  return {
    showId: showId ? parseInt(showId, 10) : undefined,
    episodeId: episodeId ? parseInt(episodeId, 10) : undefined,
  };
}

export function getSelectedShow(state: IState): IShow | undefined {
  const { showId } = getParams(state);
  return showId ? getShow(state, showId) : undefined;
}

export function getSelectedEpisodes(state: IState): IEpisode[] | undefined {
  const { showId } = getParams(state);
  return showId ? getEpisodes(state, showId) : undefined;
}

export function getSelectedEpisode(state: IState): IEpisode | undefined {
  const { showId, episodeId } = getParams(state);
  return showId && episodeId ? getEpisode(state, showId, episodeId) : undefined;
}
