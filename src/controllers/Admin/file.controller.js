const { User, Course, File } = require("../../database/models");
const bcrypt = require("bcrypt");
const moment = require("moment");

module.exports = class {
  static async index(req, res) {
    try {
      const works = await File.findAll({
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
      res.render("pages/admin/work/index");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/admin");
    }
  }

  static async view(req, res) {
    try {
      if (req.method == "POST") {
        const { currentPassword, newPassword, oldPassword } = req.body;
        const { id } = req.session.user;
        const salt = bcrypt.genSaltSync();
        const payload = {
          password: bcrypt.hashSync(newPassword, salt),
        };
        delete payload.id;
        const user = await User.update(payload, { where: { id } });

        if (!user) {
          req.flash("error", "Something went wrong, try again!");
          return res.redirect("back");
        }

        req.flash("success", "Updated successfully");
        return res.redirect("/admin/password");
      }

      res.locals.title = "Update Password";
      res.locals.message = { errors: {} };
      res.render("pages/admin/settings/password");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/admin");
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const work = await File.findByPk(id);
      var dirname = path.resolve(dir, work.file);
      if (fs.existsSync(dirname)) {
        fs.unlinkSync(dirname);
      }
      await File.destroy({ where: { id } });
      req.flash("success", "File deleted successfully");
      return res.redirect("back");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/admin");
    }
  }
};
