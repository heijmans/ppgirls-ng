import { Component, OnInit } from "@angular/core";
import { IShow } from "../state/state";

const NO_IMAGE_URL = "https://static.tvmaze.com/images/no-img/no-img-landscape-text.png";
const MISSING_IMAGE = { medium: NO_IMAGE_URL, original: NO_IMAGE_URL };

@Component({
  selector: "app-show-list",
  templateUrl: "./show-list.component.html",
  styleUrls: ["./show-list.component.scss"],
})
export class ShowListComponent implements OnInit {
  shows: IShow[] = [
    {
      id: 5,
      name: "PP1",
      premiered: "2015-01-05",
      image: MISSING_IMAGE,
    },
    {
      id: 7,
      name: "PP2",
      premiered: "2017-11-05",
      image: MISSING_IMAGE,
    },
  ];

  constructor() {}

  ngOnInit() {}

  trackByShowId(index: number, show: IShow): number {
    return show.id;
  }
}
