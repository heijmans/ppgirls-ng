import { browser, by, element } from "protractor";

function getShows() {
  return element.all(by.css(".show"));
}

function getEpisodes() {
  return element.all(by.css(".episode-row"));
}

function getTitleText() {
  return element(by.css(".details-title")).getText();
}

describe("workspace-project App", () => {
  beforeEach(() => {
    browser.get("/");
  });

  it("should show 3 shows", () => {
    const shows = getShows();
    expect(shows.count()).toEqual(3);
    expect(shows.get(2).getText()).toContain("Demashitaa! Powerpuff Girls Z (2006)");
  });

  it("should show a show and its episodes after clicking on it", () => {
    getShows()
      .get(1)
      .click();
    expect(getTitleText()).toContain("The Powerpuff Girls (1998)");
    const episodes = getEpisodes();
    expect(episodes.count()).toEqual(78);
    expect(episodes.get(2).getText()).toContain("Octi Evil / Geshundfight");
  });

  it("should show an episode after clicking on it", () => {
    getShows()
      .get(1)
      .click();
    getEpisodes()
      .get(2)
      .click();
    expect(getTitleText()).toContain("Octi Evil / Geshundfight");
  });
});
