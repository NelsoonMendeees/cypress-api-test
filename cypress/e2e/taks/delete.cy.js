import payload from '../../fixtures/delete.json'

describe("DELETE /tasks/:id", () => {
  it("Remove a task", () => {
      cy.task("removeTask", payload.remove.task.name, payload.remove.user.email);
      cy.task("removeUser", payload.remove.user.email);
      cy.postUser(payload.remove.user);

      cy.postSession(payload.remove.user).then((session) => {

        cy.postTask(session.body.token, payload.remove.task).then((respPost) => {
  
          cy.deleteTask(session.body.token, respPost.body._id).then((res) => {
            expect(res.status).to.eql(204);
          });
  
        });
  
      });
  });
  it("DELETE Task not found", () => {
      cy.task("removeTask", payload.notFound.task.name, payload.notFound.user.email)
      cy.task("removeUser", payload.notFound.user.email)
      cy.postUser(payload.notFound.user);

      cy.postSession(payload.notFound.user).then((session) => {
  
        cy.postTask(session.body.token, payload.notFound.task).then((respPost) => {
  
            cy.deleteTask(session.body.token, respPost.body._id).then((respDel) => {
                expect(respDel.status).to.eql(204);
            });
  
            cy.deleteTask(session.body.token, respPost.body._id).then((res) => {
              expect(res.status).to.eql(404);
            });
  
          });
  
      });
  
  });
});
  