Router.route('/register');
Router.route('/login');
Router.route('/', {
  name: "main-menu",
  template: "main-menu",
  subjects: function() {
    return Subjects.find();
  }
});
