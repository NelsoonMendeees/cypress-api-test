import payload from '../../fixtures/sessions.json'

describe("/sessions", () => {
  context("POST", () => {
    before(() => {
      cy.task("removeUser", payload.user.email);

      cy.postUser(payload.user).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
    it("must successfully return token", () => {
      cy.postSession(payload.user).then((response) => {
        expect(response.status).to.eq(200);

        const { user, token } = response.body;

        expect(user.name).to.eq(payload.user.name);
        expect(user.email).to.eq(payload.user.email);
        expect(token).not.to.be.empty;
      });
    });
  });

  context("Validation of mandatory fields", () => {
    payload.validateFields.forEach(function (validade) {
      it(`${validade.field}`, () => {
        cy.postSession(validade).then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });
  });
});
