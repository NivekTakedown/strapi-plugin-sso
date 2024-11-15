module.exports = [
  {
    method: "GET",
    path: "/api/connect/google",
    handler: "google.googleSignIn",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/api/connect/google/callback",
    handler: "google.googleSignInCallback",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/sso-roles",
    handler: "role.find",
  },
  {
    method: "PUT",
    path: "/sso-roles",
    handler: "role.update",
  },
];
