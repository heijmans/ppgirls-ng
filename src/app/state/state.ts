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
