//Used in title template
Session.setDefault('title', 'Explorar');
Session.setDefault('subjectId', 'new');
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
Template.mainMenu.helpers({
  connected: function () {
    return Meteor.status().connected;
  },
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
    Session.set('subjectId', 'new');
    Router.go('subjectPanel', {
      _id: 'new'
    });
  }
});A
