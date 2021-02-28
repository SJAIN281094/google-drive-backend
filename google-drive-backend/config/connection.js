const mongoose = require('mongoose');
var config = require('./index');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 50,
};

try {
  mongoose.connect(
    `mongodb+srv://${config.database.username}:${config.database.password}@${config.database.host}/${config.database.databaseName}?retryWrites=true&w=majority`,
    options
  );
} catch (err) {
  console.log('Could not connect to mongo server!');
}

module.exports = mongoose.connection;
