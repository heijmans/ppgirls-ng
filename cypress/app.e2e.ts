context("app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("should show 3 shows", () => {
    cy.get(".show")
      .should("have.length", 3)
      .contains("Demashitaa! Powerpuff Girls Z (2006)");
  });

  it("should show a show and its episodes after clicking on it", () => {
    cy.get(".show")
      .contains("The Powerpuff Girls (1998)")
      .click();
    cy.get(".details-title").contains("The Powerpuff Girls (1998)");
    cy.get(".episode-row")
      .should("have.length", 78)
      .contains("Octi Evil / Geshundfight");
  });

  it("should show an episode after clicking on it", () => {
    cy.get(".show")
      .contains("The Powerpuff Girls (1998)")
      .click();
    cy.get(".episode-row")
      .contains("Octi Evil / Geshundfight")
      .click();
    cy.get(".details-title").contains("Octi Evil / Geshundfight");
  });
});
