import { Component, Input, OnInit } from "@angular/core";
import { IShow } from "../state/state";

const NO_IMAGE_URL = "https://static.tvmaze.com/images/no-img/no-img-landscape-text.png";
const MISSING_IMAGE = { medium: NO_IMAGE_URL, original: NO_IMAGE_URL };

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"],
})
export class ShowComponent implements OnInit {
  @Input()
  showId: number;

  show: IShow = {
    id: 5,
    name: "PP1",
    premiered: "2015-01-05",
    image: MISSING_IMAGE,
    summary: "<b>Powerpuff</b> Girls",
  };

  constructor() {}

  ngOnInit() {}
}
