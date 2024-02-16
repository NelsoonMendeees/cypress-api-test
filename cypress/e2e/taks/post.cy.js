import payload from '../../fixtures/post.json'

describe("POST /tasks", () => {
  context("Register a new task", () => {
    before(() => {
      cy.purgeQueueMessages().then((res) => {
        expect(res.status).to.eql(204)
      })
    });

    it("POST a new task", () => {
      cy.task("removeTask", payload.postTask.task.name, payload.postTask.user.email);
      cy.task("removeUser", payload.postTask.user.email);

      cy.postUser(payload.postTask.user);

      cy.postSession(payload.postTask.user).then((session) => {
        cy.postTask(session.body.token, payload.postTask.task).then((res) => {
          expect(res.status).to.eql(201);
          expect(res.body.name).to.eql(payload.postTask.task.name);
          expect(res.body.tags).to.eql(payload.postTask.task.tags);
          expect(res.body.is_done).to.be.false;
          expect(res.body.user).to.eql(session.body.user._id);
          expect(res.body._id.length).to.eql(24);
        });
      });
    });

    after(() => {
      cy.getMessageQueue().then((response) => {
        cy.wait(3000)
        expect(response.status).to.eq(200)
        expect(response.body[0].payload).to.include(payload.postTask.user.name.split(' ')[0])
        expect(response.body[0].payload).to.include(payload.postTask.task.name)
        expect(response.body[0].payload).to.include(payload.postTask.user.email)
      })
    });
  });

  context('Duplicate task', () => {
    it("POST duplicate task", () => {
      cy.task("removeTask", payload.dupTask.task.name, payload.dupTask.user.email);
      cy.task("removeUser", payload.dupTask.user.email);
      cy.postUser(payload.dupTask.user);
  
      cy.postSession(payload.dupTask.user).then((session) => {

        cy.postTask(session.body.token, payload.dupTask.task);
  
        cy.postTask(session.body.token, payload.dupTask.task).then((res) => {
          expect(res.status).to.eql(409);
          expect(res.body.message).to.eql("Duplicated task!");
        });
      });
    });
  })
});