/* REQUIRE ACTION */
const createFolder = require('./createFolder');
const getFolderSize = require('./getFolderSize');
const deleteFolder = require('./deleteFolder');
const updateFolder = require('./updateFolder');
const deleteFolderV2 = require('./deleteFolderV2');

module.exports = {
  /* EXPORT ACTION */
  createFolder,
  getFolderSize,
  deleteFolder,
  updateFolder,
  deleteFolderV2,
};
