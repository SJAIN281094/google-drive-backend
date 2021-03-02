const { Folders, Files } = require('../../models');
const { removeMany, findOne, removeOne } = require('../../utils/crud');
const { CustomError } = require('../../helper');

module.exports = async (req, res) => {
  try {
    const { folderId } = req.body;
    await deleteFolderWithContent(folderId);
    return res.status(200).send({
      data: { message: 'folder deleted successfully' },
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .send({ errors: [{ message: err.message }] });
  }
};

async function deleteFolderWithContent(folderId) {
  const folder = await getFolder(folderId);
  await removeFiles(folder.name);
  await removefolders(folder.name);
  if (folder.name !== 'root') {
    await removeOne(Folders, { _id: folderId });
  }
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
    throw new CustomError('Folder does not exist', 400);
  }
  return folder;
}

async function removeFiles(folderName) {
  await removeMany(Files, { folderId: folderName });
}

async function removefolders(folderName) {
  await removeMany(Folders, { path: folderName });
}
