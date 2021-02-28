const validator = require('validator');
const { validationResult } = require('express-validator');

const {
  IGNORED_PROPERTIES_FROM_SANITIZER,
} = require('../routes/openSanitizeProperties');

const sanitizer = (input) => {
  for (const property in input) {
    if (IGNORED_PROPERTIES_FROM_SANITIZER.indexOf(property) > -1) {
      continue;
    }
    if (Array.isArray(input[`${property}`])) {
      isArr(input[`${property}`]);
    } else if (typeof input[`${property}`] === 'object') {
      for (const prop in input[`${property}`]) {
        validate(input[`${property}`], prop);
      }
    } else {
      validate(input, property);
    }
  }
  return input || {};
};

function isArr(input) {
  for (const property in input) {
    if (Array.isArray(input[`${property}`])) {
      isArr(input[`${property}`]);
    } else if (typeof input[`${property}`] === 'object') {
      for (const prop in input[`${property}`]) {
        validate(input[`${property}`], prop);
      }
    } else {
      validate(input, property);
    }
  }
}

function validate(input, property) {
  input[`${property}`] = validator.escape(
    validator.trim(String(input[`${property}`]))
  );
}

const ValidateAndSanitize = (req, res, next) => {
  const customValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        message: error.msg,
      };
    },
  });

  const errors = customValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const sanitizedInput = sanitizer(req.body);
  req.body = sanitizedInput;
  next();
};

module.exports = {
  ValidateAndSanitize,
};
