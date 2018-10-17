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

export interface IState {
  shows: ILoadEntry<IShow[]>;
  episodesByShowId: IEpisodesByShow;
}

export const INITIAL_STATE: IState = { shows: {}, episodesByShowId: {} };
