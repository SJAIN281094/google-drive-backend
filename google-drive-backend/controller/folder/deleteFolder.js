const { Folders, Files } = require('../../models');
const { removeOne, findOne, findMany } = require('../../utils/crud');
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
  const folderList = await getFolderList(folder.name);
  folderList.forEach((folder) => {
    deleteFolderWithContent(folder._id);
  });
  await removeOne(Files, { folderId: folderId });
  await removeOne(Folders, { _id: folderId });
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

async function getFolderList(folderName) {
  const folderList = await findMany(
    Folders,
    { path: folderName },
    {
      _id: 1,
    }
  );
  return folderList;
}
