//Used in title template
Session.setDefault('title', 'Explorar');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.mainMenu.events({
  'click #subjects': function () {
    Session.set('title', 'Meus Cursos');
  },
  'click #profile': function () {
    Session.set('title', 'Perfil');
  },
  'click #explore': function () {
    Session.set('title', 'Explorar');
  },
  'click #highlighted': function () {
    Session.set('title', 'Novo Curso');
  }
});
