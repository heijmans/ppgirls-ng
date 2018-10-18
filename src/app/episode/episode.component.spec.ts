import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { EpisodeComponent } from "./episode.component";
import { SafeHtmlPipe } from "../pipes/safe-html.pipe";
import { reducers } from "../state/reducers";

describe("EpisodeComponent", () => {
  let component: EpisodeComponent;
  let fixture: ComponentFixture<EpisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodeComponent, SafeHtmlPipe],
      imports: [RouterTestingModule, StoreModule.forRoot(reducers)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
