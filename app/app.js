const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");
const handlebars = require("express-handlebars");
const lusca = require("lusca");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.engine(".hbs", handlebars({extname: ".hbs"}));

if (process.env.NODE_ENV === "production") app.use(compression());

app.use(morgan("combined"));
app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  lusca({
    csp: {
      policy: {
        "default-src": "'self'",
        "script-src": "'self'",
        "connect-src": [
          "'self'",
        ].join(" "),
        "style-src": ["'self'", "'unsafe-inline'"].join(" "),
        "font-src": ["'self'"].join(" ")
      },
      scriptNonce: true
    },
    hsts: {
      maxAge: 31536000
    },
    xframe: "DENY",
    xssProtection: true,
    nosniff: true
  })
);

app.use((req, res, next) => {
  res.header("Pragma", "no-cache");
  res.header("Cache-Control", "no-cache, max-age=0, no-store");
  next();
});

app.use(require("./routes"));

module.exports = app;
