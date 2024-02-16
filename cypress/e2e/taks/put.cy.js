import payload from "../../fixtures/put.json";

describe("PUT /task/:id/done", () => {
  it("Update task to done", () => {
    cy.task("removeTask", payload.update.task.name, payload.update.user.email);
    cy.task("removeUser", payload.update.user.email);
    cy.postUser(payload.update.user);

    cy.postSession(payload.update.user).then((session) => {

      cy.postTask(session.body.token, payload.update.task).then((respPost) => {

          cy.putTask(session.body.token, respPost.body._id).then((res) => {
              expect(res.status).to.eql(204);
          });

          cy.getTaskById(session.body.token, respPost.body._id).then((res) => {
              expect(res.body.is_done).to.be.true;
          });
      });
    });
  });
  it("Update Task not found", () => {
    cy.task("removeTask", payload.notFound.task.name, payload.notFound.user.email);
    cy.task("removeUser", payload.notFound.user.email);
    cy.postUser(payload.notFound.user);

    cy.postSession(payload.notFound.user).then((session) => {

      cy.postTask(session.body.token, payload.notFound.task).then((respPost) => {

            cy.deleteTask(session.body.token, respPost.body._id).then((res) => {
                expect(res.status).to.eql(204);
            });

            cy.putTask(session.body.token, respPost.body._id).then((respDel) => {
                expect(respDel.status).to.eql(404);
            });
        });
    });
  });
});
