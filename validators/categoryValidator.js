import { body, validationResult } from "express-validator";

const categoryValidationErrors = {
  nameErr: "must be between 3 and 50 characters.",
  createdByErr: "must be a valid creator (Admin, Seller, Other).",
  stockErr: "must be a positive whole number.",
  publishDateErr: "must be a valid date.",
  descriptionErr: "must be between 10 and 500 characters.",
  thumbnailErr: "must be a valid image file (PNG, JPG, GIF).",
};

const validateCategory = [
  body("categoryTitle")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(`Category title ${categoryValidationErrors.nameErr}`),

  body("createdBy")
    .notEmpty()
    .withMessage(`Created by ${categoryValidationErrors.createdByErr}`)
    .isIn(["admin", "seller", "other"])
    .withMessage("Invalid creator selected."),

  body("stock")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage(`Stock ${categoryValidationErrors.stockErr}`),

  body("publishDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage(`Publish date ${categoryValidationErrors.publishDateErr}`),

  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage(`Description ${categoryValidationErrors.descriptionErr}`),

  body("image")
    .optional({ nullable: true })
    .custom((value, { req }) => {
      if (!req.file) return true; // Image is optional
      const allowedExtensions = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedExtensions.includes(req.file.mimetype)) {
        throw new Error(categoryValidationErrors.thumbnailErr);
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("category/categoryAdd", {
        errors: errors.array(),
      });
    }
    next();
  },
];

export { validateCategory };
