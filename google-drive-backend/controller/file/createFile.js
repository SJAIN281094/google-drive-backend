const { Files, Folders } = require('../../models');
const { createOne, updateOne, findOne } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const body = req.body;
    await createFile(body);
    return res.status(200).send({
      data: { message: 'file created successfully' },
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .send({ errors: [{ message: err.message }] });
  }
};

async function createFile({ name, folderId, format, size, dimension }) {
  const isFileNameExist = await checkFileName(name, folderId);

  if (isFileNameExist) {
    name = `${name}-${new Date().getTime()}`;
  }

  const createFileQuery = {
    name: name,
    folderId: folderId,
    format: format.toUpperCase(),
    size: size,
    dimension: dimension,
  };

  const file = await createOne(Files, createFileQuery);
  await updateFolderSize({ size, folderId });
  return file;
}

async function updateFolderSize({ size, folderId }) {
  const updateSizeQuery = {
    data: {
      $inc: { filesSize: size },
    },
    where: {
      _id: folderId,
    },
  };

  await updateOne(Folders, updateSizeQuery);
}

async function checkFileName(name, folderId) {
  const findFileQuery = {
    name: name,
    folderId: folderId,
  };
  const file = await findOne(Files, findFileQuery);
  return file;
}
