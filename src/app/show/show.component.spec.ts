import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { ShowComponent } from "./show.component";
import { ShowTitlePipe } from "../pipes/show-title.pipe";
import { SafeHtmlPipe } from "../pipes/safe-html.pipe";
import { IState } from "../state/state";
import { MOCK_STATE, MOCK_EMPTY_STATE, MOCK_EPISODES, MOCK_SHOW } from "../state/state.spec";
import { fetchShows, fetchEpisodes } from "../state/actions";
import { MockStore, createMockComponent, createMockPipe } from "../lib/helpers.spec";
import { EpisodeListComponent } from "../episode-list/episode-list.component";

describe("ShowComponent", () => {
  let store: MockStore<IState>;
  let fixture: ComponentFixture<ShowComponent>;
  let component: ShowComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowComponent,
        ShowTitlePipe,
        createMockComponent(EpisodeListComponent),
        createMockPipe(SafeHtmlPipe),
      ],
      providers: [{ provide: Store, useValue: new MockStore() }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.next(MOCK_EMPTY_STATE);
    fixture.detectChanges();
  });

  describe("before loading", () => {
    it("should set the showId, but not the show and the episodes", () => {
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
      expect(fixture.debugElement.query(By.css("app-episode-list"))).toBeNull();
    });
  });

  describe("after loading", () => {
    beforeEach(() => {
      store.next(MOCK_STATE);
      fixture.detectChanges();
    });

    it("should set the showId, the show and the episodes", () => {
      expect(component.showId).toEqual(5);
      expect(component.show).toEqual(MOCK_SHOW);
      expect(component.episodes).toEqual(MOCK_EPISODES);
    });

    it("request the show and the episodes", () => {
      expect(store.dispatch).toHaveBeenCalledWith(fetchShows());
      expect(store.dispatch).toHaveBeenCalledWith(fetchEpisodes(5));
    });

    it("should show the show", () => {
      const element = fixture.nativeElement;
      expect(element.querySelector(".details-title").textContent).toContain("PP2 (2013)");
      expect(element.querySelector(".details-image").src).toContain("original.jpg");
    });

    it("should set the right properties on the episode list", () => {
      const episodeList: EpisodeListComponent = fixture.debugElement.query(
        By.css("app-episode-list"),
      ).componentInstance;
      expect(episodeList.showId).toEqual(5);
      expect(episodeList.episodes).toEqual(MOCK_EPISODES);
    });
  });
});
