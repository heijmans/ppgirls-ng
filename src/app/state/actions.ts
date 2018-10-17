import { IEpisode, IShow } from "./state";

export const REQUEST_SHOWS = "REQUEST_SHOWS";

export interface IRequestShowsAction {
  type: "REQUEST_SHOWS";
}

export function requestShows(): IRequestShowsAction {
  return {
    type: REQUEST_SHOWS,
  };
}

export const RECEIVE_SHOWS = "RECEIVE_SHOWS";

export interface IReceiveShowsAction {
  type: "RECEIVE_SHOWS";
  data: IShow[];
}

export function receiveShows(data: IShow[]): IReceiveShowsAction {
  return {
    type: RECEIVE_SHOWS,
    data,
  };
}

export const REQUEST_EPISODES = "REQUEST_EPISODES";

export interface IRequestEpisodesAction {
  type: "REQUEST_EPISODES";
  showId: number;
}

export function requestEpisodes(showId: number): IRequestEpisodesAction {
  return {
    type: REQUEST_EPISODES,
    showId,
  };
}

export const RECEIVE_EPISODES = "RECEIVE_EPISODES";

export interface IReceiveEpisodesAction {
  type: "RECEIVE_EPISODES";
  showId: number;
  data: IEpisode[];
}

export function receiveEpisodes(showId: number, data: IEpisode[]): IReceiveEpisodesAction {
  return {
    type: RECEIVE_EPISODES,
    showId,
    data,
  };
}

export type AppAction =
  | IRequestShowsAction
  | IReceiveShowsAction
  | IRequestEpisodesAction
  | IReceiveEpisodesAction;
