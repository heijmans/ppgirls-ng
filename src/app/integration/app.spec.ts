import { TestBed, async, ComponentFixture, tick, fakeAsync } from "@angular/core/testing";
import { AppComponent } from "../app.component";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../routes";
import { APP_BASE_HREF, CommonModule, Location } from "@angular/common";
import { Router } from "@angular/router";
import { SafeHtmlPipe } from "../pipes/safe-html.pipe";
import { ShowListComponent } from "../show-list/show-list.component";
import { ShowComponent } from "../show/show.component";
import { ShowTitlePipe } from "../pipes/show-title.pipe";
import { EpisodeListComponent } from "../episode-list/episode-list.component";
import { EpisodeComponent } from "../episode/episode.component";
import { HttpClient } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { reducers } from "../state/reducers";
import { CustomRouteSerializer, INITIAL_STATE } from "../state/state";
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { ShowEffects } from "../state/show.effects";
import { of, Subject } from "rxjs";
import { MOCK_EPISODES, MOCK_SHOW } from "../state/state.mock";

describe("AppComponent", () => {
  let app: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  let httpClient: jasmine.SpyObj<HttpClient>;
  const response$List: Array<Subject<any>> = [];

  function go(url: string) {
    app.ngZone!.run(() => {
      router.navigateByUrl(url);
    });
    checkUrl(url);
  }

  function checkUrl(url: string) {
    tick();
    expect(location.path()).toBe(url);
    app.detectChanges();
  }

  function httpResponse(value: any) {
    const response$ = response$List.shift()!;
    response$.next(value);
    response$.complete();
    app.detectChanges();
  }

  beforeEach(async(() => {
    httpClient = jasmine.createSpyObj("httpClient", ["get"]);
    httpClient.get.and.callFake(() => {
      const response$ = new Subject();
      response$List.push(response$);
      return response$;
    });

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SafeHtmlPipe,
        ShowListComponent,
        ShowComponent,
        ShowTitlePipe,
        EpisodeListComponent,
        EpisodeComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        StoreModule.forRoot(reducers, { initialState: INITIAL_STATE }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([ShowEffects]),
      ],
      providers: [
        { provide: RouterStateSerializer, useClass: CustomRouteSerializer },
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: HttpClient, useValue: httpClient },
      ],
    }).compileComponents();

    app = TestBed.createComponent(AppComponent);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
  }));

  it("load and navigate from show list", fakeAsync(() => {
    go("/");

    const element = app.nativeElement;
    expect(element.querySelector(".message").textContent).toContain("Loading shows...");
    expect(element.querySelector(".show")).toBeNull();

    httpResponse([{ show: MOCK_SHOW }]);
    expect(element.querySelector(".message")).toBeNull();
    const shows = element.querySelectorAll(".show");
    expect(shows.length).toBe(1);
    expect(shows[0].textContent).toContain("PP2 (2013)");
    shows[0].click();

    tick();
    expect(location.path()).toBe("/shows/5");
    app.detectChanges();

    expect(element.querySelector(".details-title").textContent).toContain("PP2 (2013)");
    expect(element.querySelector(".message").textContent).toContain("Loading episodes...");

    httpResponse(MOCK_EPISODES);
    expect(element.querySelector(".message")).toBeNull();
    const episodes = element.querySelectorAll(".episode-row");
    expect(episodes.length).toBe(3);
    expect(episodes[1].textContent).toContain("EP102");
    episodes[1].click();

    tick();
    expect(location.path()).toBe("/shows/5/episodes/102");
    app.detectChanges();

    expect(element.querySelector(".message")).toBeNull();
    expect(element.querySelector(".details-title").textContent).toContain("EP102");
  }));

  it("load and navigate from show screen", fakeAsync(() => {
    go("/shows/5");

    const element = app.nativeElement;
    expect(element.querySelector(".message").textContent).toContain("Loading shows...");
    expect(element.querySelector(".details-title")).toBeNull();

    httpResponse([{ show: MOCK_SHOW }]);
    expect(element.querySelector(".details-title").textContent).toContain("PP2 (2013)");
    expect(element.querySelector(".message").textContent).toContain("Loading episodes...");

    httpResponse(MOCK_EPISODES);
    expect(element.querySelector(".message")).toBeNull();
    const episodes = element.querySelectorAll(".episode-row");
    expect(episodes.length).toBe(3);
    expect(episodes[1].textContent).toContain("EP102");
    episodes[1].click();

    tick();
    expect(location.path()).toBe("/shows/5/episodes/102");
    app.detectChanges();

    expect(element.querySelector(".message")).toBeNull();
    expect(element.querySelector(".details-title").textContent).toContain("EP102");
  }));

  it("load and navigate from episode screen", fakeAsync(() => {
    go("/shows/5/episodes/102");

    const element = app.nativeElement;
    expect(element.querySelector(".message").textContent).toContain("Loading shows...");
    expect(element.querySelector(".details-title")).toBeNull();

    httpResponse([{ show: MOCK_SHOW }]);
    expect(element.querySelector(".message").textContent).toContain("Loading episodes...");
    expect(element.querySelector(".details-title")).toBeNull();

    httpResponse(MOCK_EPISODES);
    expect(element.querySelector(".message")).toBeNull();
    expect(element.querySelector(".details-title").textContent).toContain("EP102");
  }));
});
