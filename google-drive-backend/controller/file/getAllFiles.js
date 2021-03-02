const { Files } = require('../../models');
const { findMany } = require('../../utils/crud');

module.exports = async (req, res) => {
  try {
    const query = req.query;
    const files = await getFiles(query);
    return res.status(200).send({
      data: { files: files },
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .send({ errors: [{ message: err.message }] });
  }
};

async function getFiles({ name, format }) {
  const findFileQuery = {};
  if (name) {
    findFileQuery.name = name;
  }

  if (format) {
    findFileQuery.format = format.toUpperCase();
  }

  const files = await findMany(
    Files,
    findFileQuery,
    {
      _id: 1,
      name: 1,
      size: 1,
      dimension: 1,
      format: 1,
    },
    [],
    {
      sort: { createdAt: -1 },
    }
  );
  return files;
}
