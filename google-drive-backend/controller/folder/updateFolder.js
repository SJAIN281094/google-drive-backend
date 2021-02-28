const { Folders } = require('../../models');
const { updateOne } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const body = req.body;
    await updateFolder(body);
    return res.status(200).send({
      data: { message: 'folder updated successfully' },
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .send({ errors: [{ message: err.message }] });
  }
};

async function updateFolder({ folderId, name }) {
  const updateFolderQuery = {
    data: {
      name: name,
    },
    where: {
      _id: folderId,
    },
  };
  await updateOne(Folders, updateFolderQuery);
  return;
}
