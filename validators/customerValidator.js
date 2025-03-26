import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be a valid email address";
const ageErr = "must be in the range 18 - 100";
const phoneErr =
  "must be a valid phone number (e.g., +254712345678 or 0712345678)";
const addressErr =
  "must be a valid address (letters, numbers, spaces, and commas allowed).";
const postalErr = "must be a valid postal code (e.g., 00100)";

const validateCustomer = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").isEmail().withMessage(`Email ${emailErr}`),
  body("phoneNumber")
    .trim()
    .matches(/^(\+254|0)[17]\d{8}$/)
    .withMessage(`Phone ${phoneErr}`),
  body("address")
    .trim()
    .matches(/^[a-zA-Z0-9\s,.-]+$/)
    .withMessage(`Address ${addressErr}`)
    .isLength({ min: 3, max: 100 })
    .withMessage("Address must be between 5 and 100 characters."),
  body("postalcode")
    .trim()
    .matches(/^\d{5}$/)
    .withMessage(`Postal code ${postalErr}`),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("customer/customerAdd", {
        errors: errors.array(),
      });
    }
    next();
  },
];

export { validateCustomer };
