const express = require('express');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs');
const session = require('express-session');
const app = express();

const cert = fs.readFileSync('./cert.pem', 'utf-8'); // public cert from IdP
const privateKey = fs.readFileSync('./key.pem', 'utf-8'); // your private key

passport.use(new SamlStrategy(
    {
      entryPoint: "https://idp.example.com/sso",                  // ✅ IDP SAML Login URL (provided by them)
      issuer: "http://localhost:4000/metadata",                   // ✅ Your Entity ID (usually your backend metadata endpoint)
      callbackUrl: "http://localhost:4000/login/saml2/callback",  // ✅ Your ACS URL (IDP will POST response here)
      cert: cert,                                                 // ✅ IDP public certificate (used to verify SAML response)
      privateCert: privateKey                                     // ✅ Your private key (used for signing requests — optional)
    },
    (profile, done) => {
      // ✅ Process the user from SAML profile
      return done(null, profile);
    }
));


app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/login", passport.authenticate("saml"));

app.get("/login/saml2",
  passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log("User authenticated successfully");
    res.redirect("/dashboard");
  }
);

app.get('/login/callback',
  passport.authenticate('saml', {
    failureRedirect: '/',
    failureFlash: true
  }),
  (req, res) => {
      console.log('req: ', req);
      console.log('req: ', req.query);
      console.log('req: ', req.body);
      console.log('req: ', req.body.SAMLRequest);
    const userData = new Saml2js(req.body.SAMLResponse).toObject(); 
    // const userData = new Saml2js(req.body.SAMLResponse).toObject(); 
    console.log('userData: ', userData);
    // User authenticated via SAML
    res.send(`Login successful. Hello ${req.user.nameID || 'user'}`);
  }
);

// Metadata route to share with IDP
app.get("/metadata", (req, res) => {
    const samlStrategy = passport._strategy('saml');
    res.type('application/xml');
    res.send(samlStrategy.generateServiceProviderMetadata());
});

app.listen(4000, () => console.log("App listening on port 4000"));
