import { async, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MISSING_IMAGE, ShowService } from "./show.service";
import { MOCK_EPISODES, MOCK_SHOW } from "./state.mock";

describe("ShowService", () => {
  let mockHttp: HttpTestingController;
  let showService: ShowService;

  function expectHttp(method: string, url: string, data: any): void {
    const req = mockHttp.expectOne(url);
    expect(req.request.method).toBe(method);
    req.flush(data);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ShowService],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    mockHttp = TestBed.get(HttpTestingController);
    showService = TestBed.get(ShowService);
  }));

  afterEach(() => {
    mockHttp.verify();
  });

  it("should get the shows", async(() => {
    showService.getShows().subscribe((shows) => {
      expect(shows).toEqual([MOCK_SHOW]);
    });
    expectHttp("GET", "https://api.tvmaze.com/search/shows?q=powerpuff", [{ show: MOCK_SHOW }]);
  }));

  it("should get the episodes", async(() => {
    showService.getEpisodes(6).subscribe((episodes) => {
      expect(episodes).toEqual(MOCK_EPISODES);
    });
    expectHttp("GET", "https://api.tvmaze.com/shows/6/episodes", MOCK_EPISODES);
  }));

  it("should fix the missing show icon", async(() => {
    showService.getShows().subscribe((shows) => {
      expect(shows).toEqual([{ id: 8, name: "PP1", premiered: "2015", image: MISSING_IMAGE }]);
    });
    expectHttp("GET", "https://api.tvmaze.com/search/shows?q=powerpuff", [{ show: { id: 8, name: "PP1", premiered: "2015" } }]);
  }));
});
