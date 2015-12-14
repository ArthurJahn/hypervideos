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
  'click #home': function () {
    Session.set('title', 'Explorar');
  },
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
});

Template.mainMenu.showValidationErrors = function (model) {
  document.querySelector('#notify').message = '';
  var errors = model.getValidationErrors();
  for (var key in errors) {
    document.querySelector('#notify').message = errors[key + ''];
  }
};
