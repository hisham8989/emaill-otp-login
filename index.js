const express = require("express");
const env = require("./config/environment");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;
const { ValidationError } = require("express-validation");

/** CONFIGURATION */

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/** ROUTES */
app.use("/", require("./routes/app.routes"));

app.all("/*", (req, res) => {
  return res.status(400).json({
    success: false,
    error: "no api found",
  });
});

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

connectDB()
  .then((connection) => {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
      console.log(`connected to DB :: ${connection.name}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
