import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore, createMockComponent, createMockPipe } from "../lib/helpers.test";
import { SafeHtmlPipe } from "../pipes/safe-html.pipe";
import { fetchShows, fetchEpisodes } from "../state/actions";
import { IState } from "../state/state";
import { MOCK_STATE, MOCK_EMPTY_STATE, MOCK_EPISODES, MOCK_SHOW } from "../state/state.mock";
import { EpisodeComponent } from "./episode.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("EpisodeComponent", () => {
  let store: MockStore<IState>;
  let fixture: ComponentFixture<EpisodeComponent>;
  let component: EpisodeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodeComponent, createMockPipe(SafeHtmlPipe)],
      providers: [{ provide: Store, useValue: new MockStore(MOCK_EMPTY_STATE) }],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  describe("before loading", () => {
    it("request the show and the episode", () => {
      expect(store.dispatch).toHaveBeenCalledWith(fetchShows());
      expect(store.dispatch).toHaveBeenCalledWith(fetchEpisodes(6));
    });

    it("should set the showId, but not the show and the episodes", () => {
      expect(component.showId).toEqual(6);
      expect(component.show).toBeUndefined();
      expect(component.episode).toBeUndefined();
    });

    it("should not show the episode", () => {
      const element = fixture.nativeElement;
      expect(element.querySelector(".details-title")).toBeNull();
      expect(element.querySelector(".details-image")).toBeNull();
    });

    it("should show the loading message", () => {
      const element = fixture.nativeElement;
      expect(element.querySelector(".message").textContent).toContain("Loading shows...");
    });
  });

  describe("after loading", () => {
    beforeEach(() => {
      store.next(MOCK_STATE);
      fixture.detectChanges();
    });

    it("request the episodes", () => {
      expect(store.dispatch).toHaveBeenCalledWith(fetchEpisodes(5));
    });

    it("should set the showId, the show and the episode", () => {
      expect(component.showId).toEqual(5);
      expect(component.show).toEqual(MOCK_SHOW);
      expect(component.episode).toEqual(MOCK_EPISODES[1]);
    });

    it("should show the episode", () => {
      const element = fixture.nativeElement;
      expect(element.querySelector(".details-title").textContent).toContain("EP102");
      expect(element.querySelector(".details-image").src).toContain("original.jpg");
    });

    it("should show a back link", () => {
      const element = fixture.nativeElement;
      expect(element.querySelector("p > a").href).toContain("/shows/5");
    });
  });
});
