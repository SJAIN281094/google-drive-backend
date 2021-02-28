use imageKit;

// Initial Base Query
db.folders.insertOne({
  name: 'root',
  filesSize: null,
  parent: null,
  path: [],
});