const express = require('express');
const router = express.Router();
const { checkSchema, header } = require('express-validator');
const { ValidateAndSanitize } = require('../helper');
const { createFile, getAllFiles } = require('../controller/file');

/* eslint-disable */
router.post(
  '/',
  [
    checkSchema({
      name: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `File name can't be empty`,
          options: {
            min: 1,
          },
        },
      },
      folderId: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `Folder Id can't be empty`,
          options: {
            min: 1,
          },
        },
      },
      format: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `File fornat be empty`,
          options: {
            min: 1,
          },
        },
      },
      size: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `File size can't be empty`,
          options: {
            min: 1,
          },
        },
      },
      dimension: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `dimension can't be empty`,
          options: {
            min: 1,
          },
        },
      },
    }),
    header(['Accept'])
      .exists({ checkFalsy: true })
      .withMessage('Accept header is missing'),
  ],
  (req, res, next) => {
    ValidateAndSanitize(req, res, next);
  },
  createFile
);

router.get('/', getAllFiles);

module.exports = router;
