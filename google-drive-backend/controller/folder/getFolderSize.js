const { Folders } = require('../../models');
const { findOne, findMany } = require('../../utils/crud');
const { CustomError } = require('../../helper');

module.exports = async (req, res) => {
  try {
    const { folderId } = req.params;
    const folder = await getFolder(folderId);
    const filesSize = await getFolderSizeByFiles(folder._id);
    const foldersSize = await getSizeOfFolders(folder.name);
    const size = filesSize + foldersSize;
    return res.status(200).send({
      data: { size },
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .send({ errors: [{ message: err.message }] });
  }
};

async function getFolderSizeByFiles(folderId) {
  const folder = await findOne(
    Folders,
    { _id: folderId },
    {
      _id: 1,
      filesSize: 1,
    }
  );
  return folder.filesSize;
}

async function getFolder(folderId) {
  const folder = await findOne(
    Folders,
    { _id: folderId },
    {
      _id: 1,
      name: 1,
    }
  );

  if (!folder) {
    throw new CustomError('Folder not exist or deleted', 400);
  }
  return folder;
}

async function getSizeOfFolders(folderName) {
  let size = 0;
  const subFolders = await findMany(
    Folders,
    { path: folderName },
    {
      filesSize: 1,
    }
  );

  if (subFolders.length > 1) {
    size = subFolders.reduce((acc, val) => acc.filesSize + val.filesSize);
  }

  if (subFolders.length === 1) {
    size = subFolders[0].filesSize;
  }

  return size;
}
