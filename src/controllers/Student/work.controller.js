const { User, Course, File } = require("../../database/models");
const moment = require("moment");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const path = require("path");
const fs = require("fs");
const dir = "src/public/files";
const Unicheck = require("../../services/unicheck");

module.exports = class {
  static async index(req, res) {
    try {
      // await Unicheck.auth();
      const { user } = req.session;
      const works = await File.findAll({
        where: { studentId: user.id },
        include: [
          {
            model: Course,
            as: "course",
            include: [
              {
                model: User,
                as: "lecturer",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });
      res.locals.works = works;
      res.locals.moment = moment;
      res.locals.sn = 1;
      res.locals.title = "Works";
      res.render("pages/student/works/index");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "student");
    }
  }

  static async create(req, res) {
    try {
      if (req.method == "POST") {
        var fileExt = path.extname(req.files.work.name).toLowerCase();
        var fileName = `${Date.now()}` + fileExt;
        var dirname = path.resolve(dir, fileName);
        var file = req.files.work.data;

        var bodyParams = {
          courseId: req.body.course,
          studentId: req.session.user.id,
          fileTitle: req.body.workTile,
          file: fileName,
        };

        var newPath = path.resolve(dir);
        if (!fs.existsSync(newPath)) {
          fs.mkdirSync(newPath);
        }

        const fileContent = new Buffer.from(file, "base64").toString();
        fs.writeFileSync(dirname, file);

        const work = await File.create(bodyParams);
        if (!work) {
          req.flash("error", "Something went wrong, try again!");
          return res.redirect("back");
        }

        await Unicheck.uploadFile(fileName, work.id);
        req.flash("success", "Work uploaded successfully");
        return res.redirect("/student/works");
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
      console.log(error);
      req.flash("error", error.message);
      res.redirect("back" || "student");
    }
  }

  static async delete(req, res) {
    try {
      const { user } = req.session;
      const { id } = req.params;
      const work = await File.findOne({ where: { id, studentId: user.id } });
      var dirname = path.resolve(dir, work.file);
      if (fs.existsSync(dirname)) {
        fs.unlinkSync(dirname);
      }
      await File.destroy({ where: { id, studentId: user.id } });
      req.flash("success", "File deleted successfully");
      return res.redirect("back");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/student");
    }
  }
};
