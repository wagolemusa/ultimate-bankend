import passport from "passport";

const jwt = require("jsonwebtoken");

export const userAuth = passport.authenticate("jwt", { session: false });



