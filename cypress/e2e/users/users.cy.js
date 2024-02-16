import payload from "../../fixtures/users.json";

describe("/users", () => {
  context("POST", () => {
    before(() => {
      cy.task("removeUser", payload.user.email);
      cy.task("removeUser", payload.duplicateUser.email);
      cy.postUser(payload.duplicateUser).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
    it("register a new user", () => {
      cy.postUser(payload.user).then((response) => {
        expect(response.status).to.eq(201);
      });
    });

    it("duplicate email", () => {
      cy.postUser(payload.duplicateUser).then((response) => {
        expect(response.status).to.eq(409);
        const { message } = response.body;
        expect(message).to.eq("Duplicated email!");
      });
    });
  });

  context("Validation of mandatory fields", () => {
    payload.validateFields.forEach(function (validate) {
      it(`${validate.field}`, () => {
        cy.postUser(validate.payload).then((response) => {
          expect(response.status).to.eq(400);
          const { message } = response.body;
          expect(message).to.eq(validate.message);
        });
      });
    });
  });
});
