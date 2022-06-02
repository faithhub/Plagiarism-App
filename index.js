const express = require("express");
const morgan = require("morgan");
// const router = require("./src/routes/dddindex");
const path = require("path");
const expressSession = require("express-session");
const dotenv = require("dotenv");
const flash = require("express-flash");
var admin = require("./src/routes/admin.route"),
  login = require("./src/routes/login.route");
logout = require("./src/routes/logout.route");
lecturer = require("./src/routes/lecturer.route");
student = require("./src/routes/student.route");
register = require("./src/routes/login.route");
// , register = require('./routes/register')
// , logout = require('./routes/logout')
// , posts = require('./routes/posts')
// , user = require('./routes/user');
// app.use('/register', register);
// app.use('/logout', logout);
// app.use('/posts', posts);
// app.use('/user', user);

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
app.set("views", path.join(__dirname, "src/views/"));
app.use(express.static(path.join(__dirname, "src/public")));

// app.use("/", router);

app.use("/", login);
app.use("/login", login);
app.use("/register", register);
app.use("/logout", logout);
app.use("/admin", admin);
app.use("/lecturer", lecturer);
app.use("/student", student);

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
