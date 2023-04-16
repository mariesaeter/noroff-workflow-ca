describe("Social Media App: Unauthenticated User", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("CANNOT log in with invalid credentials", () => {
    cy.wait(1000);
    cy.get("#registerForm button[type='reset']").click();
    cy.get("header button[data-auth='login']").click({ force: true });
    cy.wait(1000);

    cy.get("#loginForm input[type='email']")
      .should("exist")
      .type("invalid@mail.no");
    cy.get("#loginForm input[type='password']")
      .should("exist")
      .type("password");
    cy.wait(1000);
    cy.get("#loginModal button").contains("Login").should("be.visible").click();
  });

  it("CAN view the login form", () => {
    cy.get("header [data-auth='login']").click({ force: true });
    cy.get("#registerModal button")
      .contains("Login")
      .should("be.visible")
      .click();
  });
});

describe("Social Media App: Authenticated User", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerForm button[type='reset']").click();
    cy.get("header button[data-auth='login']").click({ force: true });
    cy.wait(1000);

    cy.get("#loginForm input[type='email']")
      .should("exist")
      .type("MarSae81910@stud.noroff.no");
    cy.get("#loginForm input[type='password']")
      .should("exist")
      .type("H3E4vKReNiqqGa5");
    cy.wait(1000);
    cy.get("#loginModal button").contains("Login").should("be.visible").click();
    cy.wait(2000);
  });

  it("CAN log in", () => {
    cy.url().should("include", "profile");
  });

  it("CAN visit the profile page", () => {
    cy.visit("/?view=profile");
  });

  it("CAN log out", () => {
    cy.get("header button[data-auth='logout']").click();
    cy.wait(1000);
  });
});
