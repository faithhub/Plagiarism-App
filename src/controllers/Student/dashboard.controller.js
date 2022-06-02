export default class {
  static async index(req, res) {
    try {
      // const student = await User.count({ where: { type: "student" } });
      // const lecturer = await User.count({ where: { type: "lecturer" } });
      // const admin = await User.count({ where: { type: "admin" } });
      // const dataCount = {
      //   student: student,
      //   admin: admin,
      //   lecturer: lecturer,
      // };
      res.locals.title = "Dashboard";
      res.render("pages/student/dashboard/index");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("back" || "/student");
    }
  }
}
