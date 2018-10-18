import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Store, StoreModule } from "@ngrx/store";
import { ShowComponent } from "./show.component";
import { ShowTitlePipe } from "../pipes/show-title.pipe";
import { SafeHtmlPipe } from "../pipes/safe-html.pipe";
import { IEpisode, IState } from "../state/state";
import { MOCK_STATE, MOCK_EMPTY_STATE, MOCK_EPISODES, MOCK_SHOW } from "../state/state.spec";
import { reducers } from "../state/reducers";
import { requestShows, requestEpisodes } from "../state/actions";

@Component({ selector: "app-episode-list", template: "" })
class EpisodeListMockComponent {
  @Input()
  showId: number | undefined;
  @Input()
  episodes: IEpisode[] | undefined;
}

describe("ShowComponent", () => {
  let store: Store<IState>;
  let fixture: ComponentFixture<ShowComponent>;
  let component: ShowComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowComponent, SafeHtmlPipe, ShowTitlePipe, EpisodeListMockComponent],
      imports: [StoreModule.forRoot(reducers, { initialState: MOCK_STATE })],
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
    expect(component.showId).toEqual(5);
    expect(component.show).toEqual(MOCK_SHOW);
    expect(component.episodes).toEqual(MOCK_EPISODES);
  });

  it("request the show and the episodes", () => {
    expect(store.dispatch).toHaveBeenCalledWith(requestShows());
    expect(store.dispatch).toHaveBeenCalledWith(requestEpisodes(5));
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
    expect(episodeList.showId).toEqual(5);
    expect(episodeList.episodes).toEqual(MOCK_EPISODES);
  });
});

describe("ShowComponent without show", () => {
  let fixture: ComponentFixture<ShowComponent>;
  let component: ShowComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowComponent, SafeHtmlPipe, ShowTitlePipe, EpisodeListMockComponent],
      imports: [StoreModule.forRoot(reducers, { initialState: MOCK_EMPTY_STATE })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should get the showId, but not the show and the episodes", () => {
    expect(component.showId).toEqual(6);
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
