import { validationResult } from "express-validator";
import { User } from "../database/models";
import Sequelize from "sequelize";
import bcrypt from "bcrypt";
const Op = Sequelize.Op;

export default class {
  static async createLecturer(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", "All fields are required");
      res.locals.message = { errors: errors.mapped() };
      return res.render("pages/admin/lecturer/create");
    }
    next();
  }

  static async updateLecturer(req, res, next) {
    const { id, email, name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", "All fields are required");
      res.locals.errors = errors.mapped();
      return res.redirect("back");
    }
    const checkemail = await User.count({
      where: { email, id: { [Op.notIn]: [id] } },
      paranoid: false,
    });
    if (checkemail > 0) {
      req.flash("error", "The email has already exist");
      return res.redirect("back");
    }
    next();
  }

  static async checkUser(req, res, next) {
    const { id } = req.params;
    const checkUser = await User.findOne({
      where: { id },
    });
    if (!checkUser) {
      req.flash("warning", `No user found for this id:${id}`);
      return res.redirect("/admin/students");
    }
    next();
  }

  static async createStudent(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", "All fields are required");
      res.locals.message = { errors: errors.mapped() };
      res.locals.title = "Add Student";
      return res.render("pages/admin/student/create");
    }
    next();
  }

  static async updateStudent(req, res, next) {
    const { id, email, username } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", "All fields are required");
      return res.redirect("back");
    }
    const checkemail = await User.count({
      where: { email, id: { [Op.notIn]: [id] } },
      paranoid: false,
    });
    if (checkemail > 0) {
      req.flash("error", "The email has already exist");
      return res.redirect("back");
    }
    const checkUsername = await User.count({
      where: { username, id: { [Op.notIn]: [id] } },
      paranoid: false,
    });
    if (checkUsername > 0) {
      req.flash("error", "The Matric Number has already exist");
      return res.redirect("back");
    }
    next();
  }

  static async updateProfile(req, res, next) {
    const { email, username } = req.body;
    const id = req.session.user.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", "All fields are required");
      res.locals.errors = errors.mapped();
      return res.redirect("back");
    }
    const checkemail = await User.count({
      where: { email, id: { [Op.notIn]: [id] } },
      paranoid: false,
    });
    if (checkemail > 0) {
      req.flash("error", "The email has already exist");
      return res.redirect("back");
    }
    const checkUsername = await User.count({
      where: { username, id: { [Op.notIn]: [id] } },
      paranoid: false,
    });
    if (checkUsername > 0) {
      req.flash("error", "The Admin ID has already exist");
      return res.redirect("back");
    }
    next();
  }

  static async updatePassword(req, res, next) {
    const { currentPassword } = req.body;
    const { id } = req.session.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", "All fields are required");
      res.locals.message = { errors: errors.mapped() };
      res.locals.title = "Update Password";
      return res.render("pages/admin/settings/password");
    }

    const user = await User.findByPk(id);
    const getPassword = await bcrypt.compare(currentPassword, user.password);
    if (!getPassword) {
      req.flash("error", "The Current Password is not correct");
      return res.redirect("back");
    }
    next();
  }
}
