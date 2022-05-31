import express from "express";
import morgan from "morgan";
import router from "./routes";
import path from "path";
import expressSession from "express-session";
import dotenv from "dotenv";
import flash from "express-flash";

dotenv.config();
const app = express();
const port = process.env.PORT;
//request handling
app.use(flash());
// var sessionFlash = function (req, res, next) {
//   // res.locals.currentUser = req.user;
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// };
// app.use(sessionFlash);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Auth
const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};
app.use(expressSession({ secret: process.env.SESSION_SECRET }));

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

app.use("/", (req, res, next) => {
  return res.redirect("login");
  res
    .status(200)
    .json({ status: "success", message: "Welcome to Plagiarism App" });
});

//error page handling
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
