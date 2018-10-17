import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IEpisode, IShow } from "../state/state";

const NO_IMAGE_URL = "https://static.tvmaze.com/images/no-img/no-img-landscape-text.png";
const MISSING_IMAGE = { medium: NO_IMAGE_URL, original: NO_IMAGE_URL };

@Component({
  selector: "app-episode",
  templateUrl: "./episode.component.html",
  styleUrls: ["./episode.component.scss"],
})
export class EpisodeComponent implements OnInit {
  showId: number;
  episodeId: number;

  show: IShow = {
    id: 5,
    name: "PP1",
    premiered: "2015-01-05",
    image: MISSING_IMAGE,
    summary: "<b>Powerpuff</b> Girls",
  };

  episode: IEpisode = {
    id: 5,
    name: "PP1",
    image: MISSING_IMAGE,
    season: 1,
    number: 2,
    summary: "<b>Powerpuff</b> Girls",
  };

  constructor(private route: ActivatedRoute) {
    route.paramMap.subscribe((map) => {
      this.showId = parseInt(map.get("showId"), 10);
      this.episodeId = parseInt(map.get("episodeId"), 10);
    });
  }

  ngOnInit() {}
}
