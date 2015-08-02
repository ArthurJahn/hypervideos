if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Subjects.find().count() === 0) {
      var data = [
      {name: "Meteor Principles"},
      {name: "Meteor 2"}
    ];
    _.each(data, function(subject) {
      console.log("inserting...");
      var subject_id = Subjects.insert({name: subject.name});
    });
  }
});
}
