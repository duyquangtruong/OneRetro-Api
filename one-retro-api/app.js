const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose");
const Uri =
  "mongodb+srv://admin:admin@duycluster.mybdc.mongodb.net/OneRetroDB?retryWrites=true&w=majority";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", require("./routes/login/index"));
app.use("/boards", require("./routes/boards/index"));
app.use(require("cors"));

//Create connection to database
const connectDatabase = () => {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    Uri,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        console.log(
          "Failed to connect to Database, retrying in 2 seconds",
          err
        );
        setTimeout(connectDatabase, 2000);
      } else {
        console.log("Connect Successfully !");
      }
    }
  );
};
connectDatabase();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
