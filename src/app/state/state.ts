import { RouterReducerState, RouterStateSerializer } from "@ngrx/router-store";
import { RouterStateSnapshot } from "@angular/router";

export interface IImage {
  medium: string;
  original: string;
}

export interface IShow {
  id: number;
  name: string;
  summary?: string;
  image?: IImage;
  premiered: string;
}

export interface IEpisode {
  id: number;
  name: string;
  summary?: string;
  image?: IImage;
  season: number;
  number: number;
}

export interface ILoadEntry<Data> {
  isFetching?: boolean;
  data?: Data;
}

export interface IEpisodesByShow {
  [showId: number]: ILoadEntry<IEpisode[]> | undefined;
}

export interface IParams {
  [key: string]: string | undefined;
}

export interface SimpleRouterState {
  url: string;
  params: IParams;
  queryParams: IParams;
}

export interface IState {
  shows: ILoadEntry<IShow[]>;
  episodesByShowId: IEpisodesByShow;
  router?: RouterReducerState<SimpleRouterState>;
}

export const INITIAL_STATE: IState = { shows: {}, episodesByShowId: {} };

export interface ISimpleRouteOptions {
  url?: string;
  params?: IParams;
  queryParams?: IParams;
}

export function makeSimpleRouteState({
  url,
  params,
  queryParams,
}: ISimpleRouteOptions): RouterReducerState<SimpleRouterState> {
  const state: SimpleRouterState = {
    url: url || "/",
    params: params || {},
    queryParams: queryParams || {},
  };
  return { state, navigationId: 0 };
}

export class CustomRouteSerializer implements RouterStateSerializer<SimpleRouterState> {
  serialize(routerState: RouterStateSnapshot): SimpleRouterState {
    const { url, root } = routerState;
    let route = root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return { url, params: route.params, queryParams: root.queryParams };
  }
}
