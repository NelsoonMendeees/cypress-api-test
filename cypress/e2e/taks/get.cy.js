import payload from "../../fixtures/get.json";

describe("GET /tasks", () => {
  context("GET ALL Task", () => {
    it("GET my tasks", () => {
      cy.task("removeTasksLike", "Estud4r");
      cy.task("removeUser", payload.getTask.user.xavier.email);
      cy.postUser(payload.getTask.user.xavier);

      cy.postSession(payload.getTask.user.xavier).then((session) => {
        payload.getTask.tasks.forEach(function (task) {
          cy.postTask(session.body.token, task);
        });

        cy.getTasks(session.body.token).then((res) => {
            expect(res.status).to.eql(200);
          }).its("body").should("be.an", "array").and("have.length", payload.getTask.tasks.length);
      });
    });
  });

  context("GET Task by ID", () => {
    it("Get unique task", () => {
      cy.task("removeTasksLike", "Treinar");
      cy.task("removeTasksLike", "Testar");

      cy.task("removeUser", payload.unique.user.email);
      cy.task("removeUser", payload.notFound.user.email);

      cy.postUser(payload.unique.user);
      cy.postUser(payload.notFound.user);

      cy.postSession(payload.unique.user).then((session) => {
        cy.postTask(session.body.token, payload.unique.task).then(
          (respPost) => {
            cy.getTaskById(session.body.token, respPost.body._id).then((res) => {
                expect(res.status).to.eql(200);
                expect(res.body._id).to.eql(respPost.body._id);
                expect(res.body.name).to.eql;
              });
          });
      });
    });

    it("GET Task not found", () => {
      cy.postSession(payload.notFound.user).then((session) => {
        cy.postTask(session.body.token, payload.notFound.task).then(
          (respPost) => {
            cy.deleteTask(session.body.token, respPost.body._id).then(
              (respDel) => {
                expect(respDel.status).to.eql(204);
              });

            cy.getTaskById(session.body.token, respPost.body._id).then(
              (res) => {
                expect(res.status).to.eql(404);
              });
          });
      });
    });
  });

});
