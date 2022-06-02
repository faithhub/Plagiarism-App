const { User } = require("../../database/models");
const moment = require("moment");

module.exports = class {
  static async index(req, res) {
    try {
      const lecturers = await User.findAll({
        where: { type: "lecturer" },
        order: [["id", "DESC"]],
      });
      res.locals.lecturers = lecturers;
      res.locals.moment = moment;
      res.locals.sn = 1;
      res.locals.title = "Lecturers";
      res.locals.message = {};
      res.render("pages/admin/lecturer");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/admin");
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
      res.locals.user = req.session.user;
      res.locals.title = "Add Lecturer";
      res.locals.message = { errors: [] };
      return res.render("pages/admin/lecturer/create");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/admin");
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id } });
      req.flash("success", "Lecturer deleted successfully");
      return res.redirect("/admin/lecturers");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/admin");
    }
  }

  static async edit(req, res) {
    try {
      if (req.method == "POST") {
        const payload = {
          ...req.body,
        };
        delete payload.id;
        await User.update(payload, {
          where: { id: req.body.id },
        });
        req.flash("success", "Updated successfully");
        return res.redirect("/admin/lecturers");
      }

      const { id } = req.params;
      const lecturer = await User.findOne({
        where: { type: "lecturer", id: id },
      });
      res.locals.lecturer = lecturer;
      res.locals.title = "Edit Lecturer";
      res.locals.message = { errors: [] };
      return res.render("pages/admin/lecturer/edit");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/admin");
    }
  }
};
