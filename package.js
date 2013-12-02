Package.describe({
  summary: "Easily create batch operations for tables"
});

Package.on_use(function (api) {
  api.add_files([
    'lib/jquery.table-operations.js',
    ], 'client');
});
