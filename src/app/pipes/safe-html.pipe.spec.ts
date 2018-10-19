import { SafeHtmlPipe } from "./safe-html.pipe";
import { DomSanitizer } from "@angular/platform-browser";
import { async, TestBed } from "@angular/core/testing";
import SpyObj = jasmine.SpyObj;

describe("SafeHtmlPipe", () => {
  let sanitizer: SpyObj<DomSanitizer>;

  beforeEach(async(() => {
    sanitizer = jasmine.createSpyObj<DomSanitizer>("DomSanitizer", ["bypassSecurityTrustHtml"]);
  }));

  it("should call bypassSecurityTrustHtml", () => {
    const pipe = new SafeHtmlPipe(sanitizer);
    sanitizer.bypassSecurityTrustHtml.and.returnValue("ok");
    expect(pipe.transform("<b>OK!</b>")).toBe("ok");
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith("<b>OK!</b>");
  });
});
