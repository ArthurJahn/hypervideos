if (Meteor.isServer) {
  Meteor.startup(function () {
    // FIX ME - only for tests
    // code to run on server at startup
    if (Subjects.find().count() !== 0) {
      Subjects.remove({});
    }
  });
}
Router.route('/register');
Router.route('/login');
Router.route('/', {
  name: "mainMenu",
  template: "mainMenu",
  subjects: function() {
    return Subjects.find();
  }
});
