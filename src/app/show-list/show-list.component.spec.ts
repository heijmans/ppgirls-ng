import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { ShowListComponent } from "./show-list.component";
import { ShowTitlePipe } from "../pipes/show-title.pipe";
import { reducers } from "../state/reducers";

describe("ShowListComponent", () => {
  let component: ShowListComponent;
  let fixture: ComponentFixture<ShowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowListComponent, ShowTitlePipe],
      imports: [RouterTestingModule, StoreModule.forRoot(reducers)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
