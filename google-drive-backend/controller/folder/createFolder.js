const { Folders } = require('../../models');
const { createOne, findOne } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const { name, parent } = req.body;
    await createFolder({ name, parent });
    return res.status(200).send({
      data: { message: 'folder created successfully' },
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .send({ errors: [{ message: err.message }] });
  }
};

async function createFolder({ name, parent }) {
  const path = await getFolderPath(parent);
  path.unshift(parent);
  const isFolderNameExist = await checkFolderName(name);
  if (isFolderNameExist) {
    name = `${name}-${new Date().getTime()}`;
  }

  const createFolderQuery = {
    name: name,
    path: path,
    parent: parent,
  };
  const folder = await createOne(Folders, createFolderQuery);
  return folder;
}

async function getFolderPath(parent) {
  const findPathQuery = {
    name: parent,
  };
  const folderPath = await findOne(Folders, findPathQuery);
  return folderPath.path;
}

async function checkFolderName(name) {
  const findFolderQuery = {
    name: name,
  };
  const folder = await findOne(Folders, findFolderQuery);
  return folder;
}
