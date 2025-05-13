const express = require('express');
const cors = require('cors');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');
const { Strategy: SamlStrategy } = require('passport-saml');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// ✅ Read the cert files (TCS will provide real ones)
const cert = fs.readFileSync('./cert.pem', 'utf-8'); // public cert from IdP
const privateKey = fs.readFileSync('./key.pem', 'utf-8'); // your private key

// ✅ Register the strategy
passport.use(new SamlStrategy({
  entryPoint: 'http://localhost:4000/login',
  issuer: '6687c613-12bf-478e-8566-7479c681475b',
  callbackUrl: 'http://localhost:3000/login/callback',
  cert: cert,
  privateCert: privateKey,
}, (profile, done) => {
    console.log('done: ', done);
    console.log('profile: ', profile);
  // `profile` contains the SAML attributes returned by the IdP
  return done(null, profile);
}));

// ✅ Required for Passport sessions (if using them)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Metadata route
app.get('/metadata', (req, res) => {
  const samlStrategy = passport._strategy('saml');
  res.type('application/xml');
  res.send(samlStrategy.generateServiceProviderMetadata());
});

// SAML Login Route
app.get('/login',
  passport.authenticate('saml', {
    failureRedirect: '/',
    failureFlash: true
  }), (req, res) => {
    // This callback will not be called as the user is redirected to the IdP
    // after successful authentication.
    res.send('Redirecting to IdP for authentication...');
  }
);

// SAML Callback Route
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

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
