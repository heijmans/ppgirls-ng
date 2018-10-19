import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { async, ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EpisodeListComponent } from "./episode-list.component";
import { MOCK_EPISODES } from "../state/state.mock";

describe("EpisodeListComponent", () => {
  let fixture: ComponentFixture<EpisodeListComponent>;
  let component: EpisodeListComponent;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodeListComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "shows/:showId/episodes/:episodeId", component: Component },
        ]),
      ],
    }).compileComponents();
  }));

  describe("before loading", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(EpisodeListComponent);
      component = fixture.componentInstance;
      component.showId = 10;
      fixture.detectChanges();
    });

    it("should not have seasons", () => {
      expect(component.seasons).toBeUndefined();
    });

    it("should not show the seasons or episodes", () => {
      const element = fixture.nativeElement;
      expect(element.querySelector(".season")).toBeNull();
      expect(element.querySelector(".episode-row")).toBeNull();
    });

    it("should show the loading message", () => {
      const element = fixture.nativeElement;
      expect(element.querySelector(".message").textContent).toContain("Loading episodes...");
    });
  });

  describe("after loading", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(EpisodeListComponent);
      component = fixture.componentInstance;
      component.showId = 10;
      component.episodes = MOCK_EPISODES;
      fixture.detectChanges();
      location = TestBed.get(Location);
    });

    it("should set the shows", () => {
      expect(component.seasons).toEqual([
        {
          id: "1",
          episodes: MOCK_EPISODES.slice(0, 2),
        },
        {
          id: "2",
          episodes: [MOCK_EPISODES[2]],
        },
      ]);
    });

    it("should show the episodes", fakeAsync(() => {
      const element = fixture.nativeElement;
      expect(element.querySelectorAll(".episode-row").length).toBe(3);
      expect(element.querySelector(".episode-row .episode-name").textContent).toContain("EP101");
      element.querySelector(".episode-row").click();
      tick();
      expect(location.path()).toBe("/shows/10/episodes/101");
    }));
  });
});
