import {HttpClient} from "@angular/common/http";
import {async} from "@angular/core/testing";
import {of} from "rxjs";
import {MISSING_IMAGE, ShowService} from "./show.service";
import {MOCK_EPISODES, MOCK_SHOW} from "./state.mock";

describe("ShowService", () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let showService: ShowService;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj("httpClient", ["get"]);
    showService = new ShowService(httpClient);
  });

  it("should get the shows", async(() => {
    httpClient.get.and.returnValue(of([{ show: MOCK_SHOW }]));
    showService.getShows().subscribe(shows => {
      expect(shows).toEqual([MOCK_SHOW]);
    });
    expect(httpClient.get).toHaveBeenCalledWith("https://api.tvmaze.com/search/shows?q=powerpuff");
  }));

  it("should get the episodes", async(() => {
    httpClient.get.and.returnValue(of(MOCK_EPISODES));
    showService.getEpisodes(6).subscribe(episodes => {
      expect(episodes).toEqual(MOCK_EPISODES);
    });
    expect(httpClient.get).toHaveBeenCalledWith("https://api.tvmaze.com/shows/6/episodes");
  }));

  it("should fix the missing show icon", async(() => {
    httpClient.get.and.returnValue(of([{ show: { id: 8, name: "PP1", premiered: "2015" } }]));
    showService.getShows().subscribe(shows => {
      expect(shows).toEqual([{ id: 8, name: "PP1", premiered: "2015", image: MISSING_IMAGE }]);
    });
    expect(httpClient.get).toHaveBeenCalledWith("https://api.tvmaze.com/search/shows?q=powerpuff");
  }));
});
