import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import {
  REQUEST_SHOWS,
  RECEIVE_SHOWS,
  REQUEST_EPISODES,
  RECEIVE_EPISODES,
  AppAction,
} from "./actions";
import { IState, ILoadEntry, IShow, IEpisodesByShow } from "./state";

export function shows(state: ILoadEntry<IShow[]> = {}, action: AppAction): ILoadEntry<IShow[]> {
  switch (action.type) {
    case REQUEST_SHOWS:
      return { isFetching: true };
    case RECEIVE_SHOWS:
      return { data: action.data };
    default:
      return state;
  }
}

export function episodesByShowId(state: IEpisodesByShow = {}, action: AppAction): IEpisodesByShow {
  switch (action.type) {
    case REQUEST_EPISODES:
      return { ...state, [action.showId]: { isFetching: true } };
    case RECEIVE_EPISODES:
      return { ...state, [action.showId]: { data: action.data } };
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<IState, any> = {
  shows,
  episodesByShowId,
  router: routerReducer,
};
