const { User } = require("../../database/models");
// const log4js = require('log4js');

// log4js.configure({
//   appenders: { everything: { type: 'file', filename: 'logs.log' } },
//   categories: { default: { appenders: ['everything'], level: 'ALL' } }
// });

// const logger = log4js.getLogger();

module.exports = class {
  static async login(req, res) {
    try {
      if (req.method == "POST") {
        const payload = { ...req.body, username: req.body.username };
        const { username, password } = payload;
        const user = await User.findOne({ where: { username: username } });

        if (!user) {
          req.flash("error", "No record found");
          return res.render("pages/auth/login", {
            message: {
              errors: [],
              fail: "No student found for this matric number",
            },
          });
        }

        if (!user.validPassword(password)) {
          req.flash("error", "Incorrect password");
          return res.render("pages/auth/login", {
            user: "Oluwadara",
            message: {
              errors: [],
              fail: "Incorrect password",
            },
          });
        }
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          type: user.type,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
        req.session.user = userData;
        res.locals.user = req.session.user;
        switch (userData.type) {
          case "student":
            return res.redirect("/student");
          case "lecturer":
            return res.redirect("/lecturer");
          case "admin":
            return res.redirect("/admin");
            break;
          default:
            break;
        }
      }
      res.render("pages/auth/login", {
        message: { errors: [] },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async register(req, res) {
    try {
      if (req.method == "POST") {
        const payload = {
          ...req.body,
          username: req.body.matric,
          type: "student",
        };
        delete payload.matric;
        await User.create(payload);
        return res.render("pages/auth/login", {
          message: { errors: [], success: "Register Successfully" },
        });
      }
      res.render("pages/auth/register", {
        message: { errors: [] },
      });
    } catch (error) {
      // console.log(error);
    }
  }

  static async logout(req, res) {
    try {
      req.flash("success", "You're logged out");
      req.session.destroy(function () {
        console.log("user logged out.");
      });
      res.locals.user = {};
      console.log(req.session, req.locals);
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }
};
