// Model methods defined to be run only in the server.

//
SearchSource.defineSource('subjects', function (searchText, options) {
  var options = {
    sort: {
      name: -1
    },
    limit: 20
  };
  if (searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {
      $and: [{
        name: regExp
      }, {
        owner: {
          $ne: this.userId
        }
      }]
    };
    return Subjects.find(selector, options).fetch();
  } else {
    return Subjects.find({
      owner: {
        $ne: this.userId
      }
    }, options).fetch();
  }
});

function buildRegExp (searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp('(' + parts.join('|') + ')', 'ig');
}
