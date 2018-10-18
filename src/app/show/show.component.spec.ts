import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Store, StoreModule } from "@ngrx/store";
import { ShowComponent } from "./show.component";
import { ShowTitlePipe } from "../pipes/show-title.pipe";
import { SafeHtmlPipe } from "../pipes/safe-html.pipe";
import { IEpisode, IState, makeSimpleRouteState, IShow, IImage } from "../state/state";
import { reducers } from "../state/reducers";
import { requestShows, requestEpisodes } from "../state/actions";

@Component({ selector: "app-episode-list", template: "" })
class EpisodeListMockComponent {
  @Input()
  showId: number | undefined;
  @Input()
  episodes: IEpisode[] | undefined;
}

const IMAGE: IImage = {
  medium: "medium.jpg",
  original: "original.jpg",
};
const SHOW: IShow = { id: 10, name: "PP2", premiered: "2013-01-10", image: IMAGE };
const EPISODES: IEpisode[] = [
  { id: 101, name: "EP101", image: IMAGE, season: 1, number: 1 },
  { id: 102, name: "EP102", image: IMAGE, season: 1, number: 2 },
  { id: 103, name: "EP103", image: IMAGE, season: 1, number: 3 },
];
const INITIAL_STATE: IState = {
  shows: { data: [SHOW] },
  episodesByShowId: { 10: { data: EPISODES } },
  router: makeSimpleRouteState({ params: { showId: "10" } }),
};

describe("ShowComponent", () => {
  let store: Store<IState>;
  let fixture: ComponentFixture<ShowComponent>;
  let component: ShowComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowComponent, SafeHtmlPipe, ShowTitlePipe, EpisodeListMockComponent],
      imports: [StoreModule.forRoot(reducers, { initialState: INITIAL_STATE })],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, "dispatch");

    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: testing missing show

  it("should get the showId, the show and the episodes", () => {
    expect(component.showId).toEqual(10);
    expect(component.show).toEqual(SHOW);
    expect(component.episodes).toEqual(EPISODES);
  });

  it("request the show and the episodes", () => {
    expect(store.dispatch).toHaveBeenCalledWith(requestShows());
    expect(store.dispatch).toHaveBeenCalledWith(requestEpisodes(10));
  });

  it("should set the right properties on the episode list", () => {
    const episodeList: EpisodeListMockComponent = fixture.debugElement.query(
      By.directive(EpisodeListMockComponent),
    ).componentInstance;
    expect(episodeList.showId).toEqual(10);
    expect(episodeList.episodes).toEqual(EPISODES);
  });
});
