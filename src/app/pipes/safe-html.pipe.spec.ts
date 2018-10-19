import { SafeHtmlPipe } from "./safe-html.pipe";
import { DomSanitizer } from "@angular/platform-browser";
import { async, TestBed } from "@angular/core/testing";

describe("SafeHtmlPipe", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({}).compileComponents();
  }));

  it("should render the title", () => {
    const sanitizer = TestBed.get(DomSanitizer);
    const spy = spyOn(sanitizer, "bypassSecurityTrustHtml").and.returnValue("ok");
    const pipe = new SafeHtmlPipe(sanitizer);
    expect(pipe.transform("<b>OK!</b>")).toBe("ok");
    expect(spy).toHaveBeenCalledWith("<b>OK!</b>");
  });
});
