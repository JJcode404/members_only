import { body, validationResult } from "express-validator";

const productValidationErrors = {
  nameErr:
    "must be between 3 and 50 characters and contain only letters and numbers.",
  categoryErr: "must be a valid category.",
  brandErr: "must be between 2 and 30 characters.",
  weightErr: "must be a number (grams or kg).",
  genderErr: "must be a valid gender (men, women, others).",
  stockErr: "must be a positive whole number.",
  priceErr: "must be a positive number.",
  discountErr: "must be between 0 and 100 percent.",
  descriptionErr: "must be between 10 and 500 characters.",
};

const validateProduct = [
  body("productName")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(`Product name ${productValidationErrors.nameErr}`)
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(
      "Product name must only contain letters, numbers, and spaces."
    ),

  body("brandName")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(`Brand name ${productValidationErrors.brandErr}`),

  body("weight")
    .trim()
    .optional({ nullable: true })
    .matches(/^\d+(\.\d+)?(g|kg)?$/) // Allow numbers without g/kg
    .withMessage(`Weight ${productValidationErrors.weightErr}`),

  body("stock")
    .trim()
    .toInt() // Convert to integer
    .isInt({ min: 1 })
    .withMessage(`Stock ${productValidationErrors.stockErr}`),

  body("price")
    .trim()
    .toFloat() // Convert to float
    .isFloat({ min: 1 })
    .withMessage(`Price ${productValidationErrors.priceErr}`),

  body("discount")
    .optional({ nullable: true })
    .trim()
    .toFloat() // Convert to float
    .isFloat({ min: 0, max: 100 })
    .withMessage(`Discount ${productValidationErrors.discountErr}`),

  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage(`Description ${productValidationErrors.descriptionErr}`),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("product/productAdd", {
        errors: errors.array(),
      });
    }
    next();
  },
];

export { validateProduct };
