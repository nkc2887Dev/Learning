const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcryptjs");

const users = [];

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) return done(null, false, { message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? done(null, user) : done(null, false, { message: "Incorrect password" });
}));

passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
    const user = users.find(u => u.username === username);
    done(null, user);
});

const app = express();
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "User registered" });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in", user: req.user });
});

app.get("/logout", (req, res) => {
    req.logout(() => res.json({ message: "Logged out" }));
});

app.listen(3000, () => console.log("Server running on port 3000"));
