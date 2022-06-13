const { User, Course, File } = require("../../database/models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const dir = "src/public/files";

module.exports = class {
  static async index(req, res) {
    try {
      const { user } = req.session;
      const works = await File.findAll({
        where: { courseId: user.courseId },
        include: [
          {
            model: Course,
            as: "course",
          },
          {
            model: User,
            as: "student",
          },
        ],
      });
      res.locals.title = "All Files";
      res.locals.works = works;
      res.locals.moment = moment;
      res.locals.sn = 1;
      res.render("pages/lecturer/work/index");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/lecturer");
    }
  }

  static async view(req, res) {
    try {
      const { id } = req.params;
      const work = await File.findOne({
        where: { id },
        include: [
          {
            model: Course,
            as: "course",
            include: [
              {
                model: User,
                as: "lecturer",
                attributes: ["id", "name", "username", "email"],
              },
            ],
          },
          {
            model: User,
            as: "student",
          },
        ],
      });
      res.locals.title = "File";
      res.locals.work = work;
      res.locals.moment = moment;
      res.render("pages/lecturer/work/view");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/lecturer");
    }
  }

  // static async delete(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const work = await File.findByPk(id);
  //     var dirname = path.resolve(dir, work.file);
  //     if (fs.existsSync(dirname)) {
  //       fs.unlinkSync(dirname);
  //     }
  //     await File.destroy({ where: { id } });
  //     req.flash("success", "File deleted successfully");
  //     return res.redirect("back");
  //   } catch (error) {
  //     req.flash("error", error.message);
  //     res.redirect("back" || "/admin");
  //   }
  // }
};
