const express = require('express');
const router = express.Router();
const { checkSchema, header } = require('express-validator');
const { ValidateAndSanitize } = require('../helper');
const {
  createFolder,
  getFolderSize,
  deleteFolder,
  updateFolder,
  deleteFolderV2,
} = require('../controller/folder');

router.post(
  '/',
  [
    checkSchema({
      name: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `Folder name can't be empty`,
          options: {
            min: 1,
          },
        },
      },
      parent: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `Invalid path specified`,
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
  createFolder
);

router.get('/:folderId/size', getFolderSize);
router.delete(
  '/',
  [
    checkSchema({
      folderId: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `FolderId can't be empty`,
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
  deleteFolder
);

router.patch(
  '/',
  [
    checkSchema({
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
      name: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `Folder Name can't be empty`,
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
  updateFolder
);

router.delete(
  '/v2',
  [
    checkSchema({
      folderId: {
        in: ['body'],
        isString: true,
        isLength: {
          errorMessage: `FolderId can't be empty`,
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
  deleteFolderV2
);

module.exports = router;
