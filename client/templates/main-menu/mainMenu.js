//Used in title template
Session.setDefault('title', 'Novo Curso');

Template.mainMenu.events({
  'click #profile': function () {
    Session.set('title', 'Perfil');
  },
  'click #subjects': function () {
    Session.set('title', 'Meus Cursos');
  },
  'click #highlighted': function () {
    Session.set('title', 'Novo Curso');
  },
  'click #explore': function () {
    Session.set('title', 'Explorar');
  }

});
