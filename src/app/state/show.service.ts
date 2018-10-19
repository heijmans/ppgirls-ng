import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IImage, IShow, IEpisode } from "./state";

const API_HOST = "https://api.tvmaze.com";
const NO_IMAGE_URL = "https://static.tvmaze.com/images/no-img/no-img-landscape-text.png";
export const MISSING_IMAGE = { medium: NO_IMAGE_URL, original: NO_IMAGE_URL };

export interface IImageOwner {
  image?: IImage;
}

// replace the image http urls with secure, https urls
// replace missing images with placeholders
function fixImage<T extends IImageOwner>(item: T): T {
  let { image } = item;
  if (image) {
    const { medium, original } = image;
    image = {
      medium: medium.replace(/^http:\/\//, "https://"),
      original: original.replace(/^http:\/\//, "https://"),
    };
  } else {
    image = MISSING_IMAGE;
  }
  return Object.assign({}, item, { image });
}

@Injectable({
  providedIn: "root",
})
export class ShowService {
  constructor(private http: HttpClient) {}

  getShows(): Observable<IShow[]> {
    return this.http
      .get<Array<{ show: IShow }>>(`${API_HOST}/search/shows?q=powerpuff`)
      .pipe(map((shows) => shows.map(({ show }) => fixImage(show))));
  }

  getEpisodes(showId: number): Observable<IEpisode[]> {
    return this.http
      .get<IEpisode[]>(`${API_HOST}/shows/${showId}/episodes`)
      .pipe(map((episodes) => episodes.map((episode) => fixImage(episode))));
  }
}
