"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var middleware_1 = require("next-auth/middleware");
exports.default = (0, middleware_1.withAuth)({
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
});
