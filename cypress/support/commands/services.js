Cypress.Commands.add("postUser", (user) => {
  cy.api({
    url: "/users",
    method: "POST",
    body: user,
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postSession", (user) => {
  cy.api({
    url: "/sessions",
    method: "POST",
    body: { email: user.email, password: user.password },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("postTask", (token, task) => {
  cy.api({
    url: "/tasks",
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: task,
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getTasks", (token) => {
  cy.api({
    url: "/tasks",
    method: "GET",
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getTaskById", (token, id) => {
  cy.api({
    url: `/tasks/${id}`,
    method: "GET",
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("deleteTask", (token, id) => {
  cy.api({
    url: `/tasks/${id}`,
    method: "DELETE",
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("putTask", (token, id) => {
  cy.api({
    url: `/tasks/${id}/done`,
    method: "PUT",
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

