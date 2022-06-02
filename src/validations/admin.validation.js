const { check, validationResult } = require("express-validator");
const { User } = require("../database/models");

module.exports = (method) => {
  switch (method) {
    case "updateLecturer":
      {
        return [
          check("name", "The Name is required")
            .trim()
            .not()
            .isEmpty()
            .isLength({
              min: 3,
            })
            .withMessage("Your name must more than 3 characters long")
            .isLength({
              max: 50,
            })
            .withMessage("Your name must be less than 50 characters long"),
          // check("userId", "The Lecturer ID is required").not().isEmpty(),
          check("email", "The Email is required")
            .trim()
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Your email is not valid")
            .isLength({
              max: 50,
            })
            .withMessage("Email must be less than 50 characters long"),
        ];
      }
      break;
    case "createLecturer":
      {
        return [
          check("name", "The Name is required")
            .trim()
            .not()
            .isEmpty()
            .isLength({
              min: 3,
            })
            .withMessage("Your name must more than 3 characters long")
            .isLength({
              max: 50,
            })
            .withMessage("Your name must be less than 50 characters long"),
          check("userId", "The Lecturer ID is required")
            .not()
            .isEmpty()
            .custom((value) => {
              return User.findOne({ where: { username: value } }).then(
                (data) => {
                  if (data) {
                    return Promise.reject("The Lecturer ID already exist");
                  }
                }
              );
            }),
          check("email", "The Email is required")
            .trim()
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Your email is not valid")
            .isLength({
              max: 50,
            })
            .withMessage("Email must be less than 50 characters long")
            .custom((value) => {
              return User.findOne({ where: { email: value } }).then((data) => {
                if (data) {
                  return Promise.reject("The email already exist");
                }
              });
            }),
          check("password", "The Password is required")
            .not()
            .isEmpty()
            .isLength({
              min: 6,
            })
            .withMessage("Password must be minimum 5 length")
            .matches(/(?=.*?[A-Z])/)
            .withMessage("Password must have at least one Uppercase")
            .matches(/(?=.*?[a-z])/)
            .withMessage("Password must have at least one Lowercase")
            .matches(/(?=.*?[0-9])/)
            .withMessage("Password must have at least one Number"),
          check("confirmPassword", "The Confrim Password is required")
            .not()
            .isEmpty()
            .custom((value, { req }) => {
              if (value !== req.body.password) {
                throw new Error(
                  "Password confirmation does not match with password"
                );
              }
              return true;
            }),
        ];
      }
      break;

    case "createStudent":
      {
        return [
          check("name", "The Name is required")
            .trim()
            .not()
            .isEmpty()
            .isLength({
              min: 3,
            })
            .withMessage("Your name must more than 3 characters long")
            .isLength({
              max: 50,
            })
            .withMessage("Your name must be less than 50 characters long"),
          check("userId", "The Lecturer ID is required")
            .not()
            .isEmpty()
            .custom((value) => {
              return User.findOne({ where: { username: value } }).then(
                (data) => {
                  if (data) {
                    return Promise.reject("The Matric Number already exist");
                  }
                }
              );
            }),
          check("email", "The Email is required")
            .trim()
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Your email is not valid")
            .isLength({
              max: 50,
            })
            .withMessage("Email must be less than 50 characters long")
            .custom((value) => {
              return User.findOne({ where: { email: value } }).then((data) => {
                if (data) {
                  return Promise.reject("The email already exist");
                }
              });
            }),
          check("password", "The Password is required")
            .not()
            .isEmpty()
            .isLength({
              min: 6,
            })
            .withMessage("Password must be minimum 5 length")
            .matches(/(?=.*?[A-Z])/)
            .withMessage("Password must have at least one Uppercase")
            .matches(/(?=.*?[a-z])/)
            .withMessage("Password must have at least one Lowercase")
            .matches(/(?=.*?[0-9])/)
            .withMessage("Password must have at least one Number"),
          check("confirmPassword", "The Confrim Password is required")
            .not()
            .isEmpty()
            .custom((value, { req }) => {
              if (value !== req.body.password) {
                throw new Error(
                  "Password confirmation does not match with password"
                );
              }
              return true;
            }),
        ];
      }
      break;

    case "updateStudent":
      {
        return [
          check("name", "The Name is required")
            .trim()
            .not()
            .isEmpty()
            .isLength({
              min: 3,
            })
            .withMessage("Your name must more than 3 characters long")
            .isLength({
              max: 50,
            })
            .withMessage("Your name must be less than 50 characters long"),
          check("username", "The matric number is required").not().isEmpty(),
          check("email", "The Email is required")
            .trim()
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Your email is not valid")
            .isLength({
              max: 50,
            })
            .withMessage("Email must be less than 50 characters long"),
        ];
      }
      break;

    case "updateProfile":
      {
        return [
          check("name", "The Name is required")
            .trim()
            .not()
            .isEmpty()
            .isLength({
              min: 3,
            })
            .withMessage("Your name must more than 3 characters long")
            .isLength({
              max: 50,
            })
            .withMessage("Your name must be less than 50 characters long"),
          check("username", "The Admin ID is required").not().isEmpty(),
          check("email", "The Email is required")
            .trim()
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage("Your email is not valid")
            .isLength({
              max: 50,
            })
            .withMessage("Email must be less than 50 characters long"),
        ];
      }
      break;
    case "updatePassword":
      {
        return [
          check("currentPassword", "Current Password  is required")
            .trim()
            .escape()
            .not()
            .isEmpty(),
          check("newPassword", "New Password is required")
            .trim()
            .escape()
            .notEmpty()
            .isLength({
              min: 6,
            })
            .withMessage("New Password must be minimum 5 length")
            .matches(/(?=.*?[A-Z])/)
            .withMessage("New Password must have at least one Uppercase")
            .matches(/(?=.*?[a-z])/)
            .withMessage("New Password must have at least one Lowercase")
            .matches(/(?=.*?[0-9])/)
            .withMessage("New Password must have at least one Number"),
          check("confirmPassword", "Confirm Password is required")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .custom((value, { req }) => {
              if (value !== req.body.newPassword) {
                throw new Error("Confirm Password does not match password");
              }
              return true;
            }),
        ];
      }
      break;
  }
};
