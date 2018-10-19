import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore } from "../lib/helpers.test";
import { ShowTitlePipe } from "../pipes/show-title.pipe";
import { fetchShows } from "../state/actions";
import { IState } from "../state/state";
import { MOCK_STATE, MOCK_EMPTY_STATE, MOCK_SHOW } from "../state/state.mock";
import { ShowListComponent } from "./show-list.component";

describe("ShowListComponent", () => {
  let store: MockStore<IState>;
  let fixture: ComponentFixture<ShowListComponent>;
  let component: ShowListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowListComponent, ShowTitlePipe],
      providers: [{ provide: Store, useValue: new MockStore() }],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.next(MOCK_EMPTY_STATE);
    fixture.detectChanges();
  });

  describe("before loading", () => {
    it("request the show", () => {
      expect(store.dispatch).toHaveBeenCalledWith(fetchShows());
    });

    it("should not have shows", () => {
      expect(component.shows).toBeUndefined();
    });

    it("should not show the shows", () => {
      const element = fixture.nativeElement;
      expect(element.querySelector(".show")).toBeNull();
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

    it("should set the shows", () => {
      expect(component.shows).toEqual([MOCK_SHOW]);
    });

    it("should show the shows", () => {
      const element = fixture.nativeElement;
      expect(element.querySelectorAll(".show").length).toBe(1);
      expect(element.querySelector(".show .show-name").textContent).toContain("PP2 (2013)");
      expect(element.querySelector(".show").href).toContain("/shows/5");
    });
  });
});
