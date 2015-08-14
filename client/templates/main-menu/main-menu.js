//Used in title template
Session.setDefault('title', 'Novo Curso');
//Used in panel logic
Session.setDefault('activePanel', '3');

Template.mainMenu.helpers({
  activePanel: function() {
    return Session.get('activePanel');
  }
});

Template.mainMenu.events({
  'click #subjects': function () {
    Session.set('title', 'Meus Cursos');
    Session.set('activePanel', '0');
  },
  'click #profile': function () {
    Session.set('title', 'Perfil');
    Session.set('activePanel', '1');
  },
  'click #explore': function () {
    Session.set('title', 'Explorar');
    Session.set('activePanel', '2');
  },
  'click #highlighted': function () {
    Session.set('title', 'Novo Curso');
    Session.set('activePanel', '3');
  }
});
