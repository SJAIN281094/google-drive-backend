const CustomError = require('../helper/Error');

const findOne = async (model, query, select, populate = [{ path: '' }]) => {
  try {
    const doc = await model
      .findOne({ ...query })
      .select({ ...select })
      .populate(populate)
      .exec();
    return doc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const findMany = async (
  model,
  query,
  select,
  populate = [{ path: '' }],
  options = {}
) => {
  try {
    const docs = await model
      .find({ ...query })
      .select({ ...select })
      .populate(populate)
      .skip(options.skip)
      .limit(options.limit)
      .sort(options.sort)
      .lean()
      .exec();
    return docs;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const findOneOrCreate = async (model, query, select) => {
  try {
    let doc = await model
      .findOne({ ...query })
      .select({ ...select })
      .lean()
      .exec();

    if (!doc) {
      doc = await createOne(model, query);
      doc = doc.toObject();
      doc.isNew = true;
    } else {
      doc.isNew = false;
    }
    return doc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const createOne = async (model, query) => {
  try {
    const doc = await model.create({ ...query });
    return doc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const updateOne = async (model, query) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        { ...query.where },
        { ...query.data },
        { ...query.options, new: true }
      )
      .lean()
      .exec();
    return updatedDoc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const removeOne = async (model, query) => {
  try {
    const removed = await model.findOneAndRemove({
      ...query,
    });
    return removed;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

const findCount = async (model, query) => {
  try {
    const doc = await model.countDocuments({ ...query }).exec();
    return doc;
  } catch (err) {
    throw new CustomError(err, 500);
  }
};

module.exports = {
  removeOne,
  findMany,
  findOne,
  findCount,
  findOneOrCreate,
  createOne,
  updateOne,
};
