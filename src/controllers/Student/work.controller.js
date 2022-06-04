const { User, Course } = require("../../database/models");
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = class {
  static async index(req, res) {
    try {
      // res.locals.works = works;
      res.locals.moment = moment;
      res.locals.sn = 1;
      res.locals.title = "Works";
      res.render("pages/student/works/index");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/student");
    }
  }

  static async create(req, res) {
    try {
      if (req.method == "POST") {
        const payload = {
          ...req.body,
          username: req.body.userId,
          type: "lecturer",
        };
        delete payload.userId;
        const user = await User.create(payload);

        if (!user) {
          req.flash("error", "Something went wrong, try again!");
          return res.redirect("/admin/add-lecturer");
        }

        req.flash("success", "New record addedd successfully");
        return res.redirect("/admin/lecturers");
      }
      const courses = await Course.findAll({
        where: {
          "$lecturer.id$": {
            [Op.ne]: null,
          },
        },
        include: [
          {
            model: User,
            as: "lecturer",
            attributes: ["id", "name", "email"],
          },
        ],
        raw: true,
        nest: true,
      });
      res.locals.courses = courses;
      res.locals.title = "Submit Work";
      res.locals.message = { errors: [] };
      return res.render("pages/student/works/create");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/student");
    }
  }
};
