const express = require("express");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

passport.use(new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: "/callback"
}, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/login", passport.authenticate("auth0", { scope: "openid email profile" }));
app.get("/callback", passport.authenticate("auth0", { failureRedirect: "/" }), (req, res) => res.redirect("/profile"));
app.get("/profile", (req, res) => req.isAuthenticated() ? res.json(req.user) : res.redirect("/login"));
app.get("/logout", (req, res) => {
    req.logout(() => res.redirect("https://yourdomain.auth0.com/v2/logout"));
});

app.listen(3000, () => console.log("Server running on port 3000"));
