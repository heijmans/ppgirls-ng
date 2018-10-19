import { Component } from "@angular/core";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";

// tslint:disable-next-line: component-selector
@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent {}

describe("AppComponent", () => {
  let app: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterOutletStubComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    app = TestBed.createComponent(AppComponent);
    app.detectChanges();
  });

  it("should have a header", () => {
    const appNE = app.debugElement.nativeElement;
    expect(appNE.querySelector(".header")).toBeTruthy();
  });

  it("should have a router outlet", () => {
    const appNE = app.debugElement.nativeElement;
    expect(appNE.querySelector("router-outlet")).toBeTruthy();
  });
});
