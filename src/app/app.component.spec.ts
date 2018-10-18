import { Component } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";

// tslint:disable-next-line: component-selector
@Component({ selector: "router-outlet", template: "" })
class RouterOutletStubComponent {}

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterOutletStubComponent],
    }).compileComponents();
  }));

  it("should have a header", () => {
    const app = TestBed.createComponent(AppComponent);
    app.detectChanges();
    const appNE = app.debugElement.nativeElement;
    expect(appNE.querySelector(".header")).toBeTruthy();
  });

  it("should have a router outlet", () => {
    const app = TestBed.createComponent(AppComponent);
    app.detectChanges();
    const appNE = app.debugElement.nativeElement;
    expect(appNE.querySelector("router-outlet")).toBeTruthy();
  });
});
