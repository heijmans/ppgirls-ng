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
const EMPTY_STATE: IState = {
  shows: {},
  episodesByShowId: {},
  router: makeSimpleRouteState({ params: { showId: "11" } }),
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

  it("should get the showId, the show and the episodes", () => {
    expect(component.showId).toEqual(10);
    expect(component.show).toEqual(SHOW);
    expect(component.episodes).toEqual(EPISODES);
  });

  it("request the show and the episodes", () => {
    expect(store.dispatch).toHaveBeenCalledWith(requestShows());
    expect(store.dispatch).toHaveBeenCalledWith(requestEpisodes(10));
  });

  it("should show the show", () => {
    const element = fixture.nativeElement;
    expect(element.querySelector(".details-title").textContent).toContain("PP2 (2013)");
    expect(element.querySelector(".details-image").src).toContain("original.jpg");
  });

  it("should set the right properties on the episode list", () => {
    const episodeList: EpisodeListMockComponent = fixture.debugElement.query(
      By.directive(EpisodeListMockComponent),
    ).componentInstance;
    expect(episodeList.showId).toEqual(10);
    expect(episodeList.episodes).toEqual(EPISODES);
  });
});

describe("ShowComponent without show", () => {
  let fixture: ComponentFixture<ShowComponent>;
  let component: ShowComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowComponent, SafeHtmlPipe, ShowTitlePipe, EpisodeListMockComponent],
      imports: [StoreModule.forRoot(reducers, { initialState: EMPTY_STATE })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should get the showId, but not the show and the episodes", () => {
    expect(component.showId).toEqual(11);
    expect(component.show).toBeUndefined();
    expect(component.episodes).toBeUndefined();
  });

  it("should not show the show", () => {
    const element = fixture.nativeElement;
    expect(element.querySelector(".details-title")).toBeNull();
    expect(element.querySelector(".details-image")).toBeNull();
  });

  it("should show the loading message", () => {
    const element = fixture.nativeElement;
    expect(element.querySelector(".message").textContent).toContain("Loading shows...");
  });

  it("should not show the episode list", () => {
    expect(fixture.debugElement.query(By.directive(EpisodeListMockComponent))).toBeNull();
  });
});
